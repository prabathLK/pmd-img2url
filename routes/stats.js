import express from 'express';
import Image from '../models/Image.js';
import { getStats } from '../models/Stats.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stats = await getStats();
    const currentAvailable = await Image.countDocuments();

    res.status(200).json({
      totalUploads: stats.totalUploads,
      totalViews: stats.totalViews,
      totalDeletes: stats.totalDeletes,
      currentAvailable: currentAvailable
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not fetch stats' });
  }
});

export default router;
