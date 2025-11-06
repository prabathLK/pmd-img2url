import express from 'express';
import Image from '../models/Image.js';

const router = express.Router();

router.get('/:key', async (req, res) => {
  const { key } = req.params;

  try {
    const image = await Image.findOne({ fileKey: key });

    if (!image) {
      return res.status(404).send('File not found. It may have expired and been deleted.');
    }

    image.lastAccessedDate = Date.now();
    await image.save();

    const r2Url = `${process.env.R2_PUBLIC_URL}/${image.fileKey}`;

    res.redirect(302, r2Url);

  } catch (e) {
    console.error(e);
    res.status(500).send('Server error.');
  }
});

export default router;
