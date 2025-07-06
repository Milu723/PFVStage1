import { connectToDatabase } from '@/lib/mongodb';
import { Transaction } from '@/models/transaction';
import { NextResponse } from 'next/server';

// GET all transactions
export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

// POST new transaction
export async function POST(request: Request) {
  const { amount, date, description } = await request.json();
  await connectToDatabase();
  const transaction = new Transaction({ amount, date, description });
  await transaction.save();
  return NextResponse.json(transaction);
}

  // DELETE transaction by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await connectToDatabase();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Transaction deleted" });
}

// updating transactions
export async function PATCH(request: Request) {
  const { id, amount, date, description } = await request.json();
  await connectToDatabase();
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    id,
    { amount, date, description },
    { new: true }
  );
  return NextResponse.json(updatedTransaction);
}
