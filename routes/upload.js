import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, BUCKET_NAME } from '../config/s3Client.js';
import Image from '../models/Image.js';
import { getStats } from '../models/Stats.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 2 * 1024 * 1024
  }, 
}).single('file');

router.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `File too large. Limit is 2MB.` });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      const fileExt = path.extname(req.file.originalname);
      const fileKey = crypto.randomBytes(16).toString('hex') + fileExt;

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });
      await s3Client.send(command);

      const newImage = new Image({
        fileKey: fileKey,
        originalName: req.file.originalname,
        lastAccessedDate: Date.now(),
      });
      await newImage.save();
      
      const stats = await getStats();
      stats.totalUploads += 1;
      await stats.save();

      const viewUrl = `${process.env.BASE_URL}/v/${fileKey}`;
      
      if (req.accepts('html')) {
        res.redirect('/?success=true&url=' + encodeURIComponent(viewUrl));
      } else {
        res.status(200).json({ url: viewUrl });
      }

    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Server error during upload.' });
    }
  });
});

export default router;
