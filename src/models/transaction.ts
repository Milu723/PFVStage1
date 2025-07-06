import mongoose, { Schema, models } from 'mongoose';

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },  // New Field
  },
  { timestamps: true }
);

export const Transaction =
  models.Transaction || mongoose.model('Transaction', transactionSchema);
