import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'singleton',
    unique: true
  },
  totalUploads: {
    type: Number,
    default: 0
  },
  totalViews: {
    type: Number,
    default: 0
  },
  totalDeletes: {
    type: Number,
    default: 0
  }
});

const Stats = mongoose.model('Stats', StatsSchema);

export const getStats = async () => {
  let stats = await Stats.findOne({ key: 'singleton' });
  if (!stats) {
    stats = await new Stats().save();
  }
  return stats;
};

export default Stats;
