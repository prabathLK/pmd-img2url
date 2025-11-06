import express from 'express';
import 'dotenv/config';
import cron from 'node-cron';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { s3Client, BUCKET_NAME } from './config/s3Client.js';
import Image from './models/Image.js';
import { getStats } from './models/Stats.js';

import uploadRoute from './routes/upload.js';
import viewRoute from './routes/view.js';
import statsRoute from './routes/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/upload', uploadRoute);
app.use('/v', viewRoute);
app.use('/stats', statsRoute);

cron.schedule('0 0 * * *', async () => {
  console.log('Running daily cleanup job for pmd-img2url...');
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const expiredImages = await Image.find({
      lastAccessedDate: { $lt: thirtyDaysAgo }
    });

    if (expiredImages.length === 0) {
      console.log('Cleanup: No expired images found.');
      return;
    }

    console.log(`Cleanup: Found ${expiredImages.length} expired images. Deleting...`);
    const stats = await getStats();

    for (const image of expiredImages) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: image.fileKey,
      });
      await s3Client.send(deleteCommand);
      await Image.findByIdAndDelete(image._id);
      
      stats.totalDeletes += 1;
    }
    
    await stats.save();
    console.log(`Cleanup: Job finished. ${expiredImages.length} images deleted.`);

  } catch (err) {
    console.error('Error during cleanup job:', err);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`pmd-img2url server running on port ${PORT}`);
});
