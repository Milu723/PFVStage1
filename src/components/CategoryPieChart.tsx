"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

export default function CategoryPieChart() {
  const [data, setData] = useState<{ category: string; total: number }[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const transactions: Transaction[] = await res.json();
      const categoryTotals: Record<string, number> = {};

      transactions.forEach((txn) => {
        categoryTotals[txn.category] =
          (categoryTotals[txn.category] || 0) + txn.amount;
      });

      const formattedData = Object.entries(categoryTotals).map(
        ([category, total]) => ({ category, total })
      );

      setData(formattedData);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Category-wise Expenses</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
