import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    targetDays: { type: Number, default: 66, min: 1, max: 200 },
    streak: { type: Number, default: 0, min: 0 },
    lastCompletedAt: { type: Date, default: null },
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Habit', HabitSchema);