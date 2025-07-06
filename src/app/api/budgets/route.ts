import { connectToDatabase } from '@/lib/mongodb';
import { Budget } from '@/models/budget';
import { NextResponse } from 'next/server';

// GET all budgets
export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find().sort({ month: -1 });
  return NextResponse.json(budgets);
}

// POST new budget
export async function POST(request: Request) {
  const { category, amount, month } = await request.json();
  await connectToDatabase();
  const budget = new Budget({ category, amount, month });
  await budget.save();
  return NextResponse.json(budget);
}
