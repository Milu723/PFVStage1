import mongoose, { Schema, models } from 'mongoose';

const budgetSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String, // e.g., "2025-07"
      required: true,
    },
  },
  { timestamps: true }
);

export const Budget =
  models.Budget || mongoose.model('Budget', budgetSchema);
