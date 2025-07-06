"use client";

import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
  });

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTransactions();
  };

  const handleEditClick = (txn: Transaction) => {
    setEditingId(txn._id);
    setForm({
      amount: txn.amount.toString(),
      date: txn.date.slice(0, 10), // yyyy-mm-dd format
      description: txn.description,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    await fetch("/api/transactions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, ...form, amount: Number(form.amount) }),
    });

    setEditingId(null);
    fetchTransactions();
  };

  return (
    <div className="mt-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction List</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((txn) => (
            <li
              key={txn._id}
              className="p-2 border rounded shadow"
            >
              {editingId === txn._id ? (
                <form onSubmit={handleEditSubmit} className="space-y-2">
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <div className="flex space-x-2">
                    <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{txn.description}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(txn.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${txn.amount}</span>
                    <button
                      onClick={() => handleEditClick(txn)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(txn._id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
