"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Define Transaction interface
interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

// Define Chart Data interface
interface ChartData {
  month: string;
  total: number;
}

export default function ExpensesChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    processChartData(data);
  };

  fetchTransactions();
}, []);


  const processChartData = (data: Transaction[]) => {
    const monthlyTotals: Record<string, number> = {};

    data.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString("default", { month: "short", year: "numeric" });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + txn.amount;
    });

    const formattedData: ChartData[] = Object.entries(monthlyTotals).map(([month, total]) => ({
      month,
      total,
    }));

    setChartData(formattedData);
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Monthly Expenses</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
