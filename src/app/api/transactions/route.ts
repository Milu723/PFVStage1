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
  const { amount, date, description, category } = await request.json();
  await connectToDatabase();
  const transaction = new Transaction({ amount, date, description, category });
  await transaction.save();
  return NextResponse.json(transaction);
}
