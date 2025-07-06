"use client";

import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface Budget {
  _id: string;
  category: string;
  amount: number;
  month: string;
}

export default function BudgetComparison() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txnRes = await fetch("/api/transactions");
        const txnData = await txnRes.json();
        const budgetRes = await fetch("/api/budgets");
        const budgetData = await budgetRes.json();

        setTransactions(txnData);
        setBudgets(budgetData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getComparisonData = () => {
    const spendingByCategory: Record<string, number> = {};

    transactions.forEach((txn) => {
      spendingByCategory[txn.category] = (spendingByCategory[txn.category] || 0) + txn.amount;
    });

    return budgets.map((budget) => {
      const spent = spendingByCategory[budget.category] || 0;
      return {
        category: budget.category,
        budgeted: budget.amount,
        spent,
      };
    });
  };

  const comparisonData = getComparisonData();

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Budget Comparison</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {comparisonData.map((item) => (
            <li key={item.category} className="p-4 border rounded shadow">
              <p className="font-semibold">Category: {item.category}</p>
              <p>Budgeted: ₹{item.budgeted}</p>
              <p>Spent: ₹{item.spent}</p>
              <p
                className={`font-semibold ${
                  item.spent > item.budgeted ? "text-red-600" : "text-green-600"
                }`}
              >
                {item.spent > item.budgeted ? "Over Budget" : "Within Budget"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
