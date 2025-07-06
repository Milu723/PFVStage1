"use client";

import { useState } from "react";

export default function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [message, setMessage] = useState("");

  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount),
        date,
        description,
        category,
      }),
    });

    if (res.ok) {
      setMessage("Transaction added successfully!");
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("Food");
    } else {
      setMessage("Failed to add transaction.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mt-10 p-4 border rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
