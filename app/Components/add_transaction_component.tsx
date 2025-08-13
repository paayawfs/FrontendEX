'use client';
import React, { useState } from 'react';
import type { TransactionData } from '@/app/types';

interface AddTransactionProps {
  onAdd: (data: TransactionData) => Promise<void> | void;
  categories: string[];
}

const AddTransactionComponent: React.FC<AddTransactionProps> = ({ onAdd, categories }) => {
  const [form, setForm] = useState<TransactionData>({
    transactionName: '',
    amount: 0,
    transactionType: 'Debit',
    category: categories[0] || 'Food',
    date: new Date().toISOString().slice(0, 10),
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        name="transactionName"
        value={form.transactionName}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Name"
        required
      />
      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Amount"
        required
      />
      <select
        name="transactionType"
        value={form.transactionType}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </select>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded md:col-span-2"
        placeholder="Description"
      />
      <button
        type="submit"
        className="bg-[#6c63ff] text-white rounded px-4 py-2 md:col-span-2"
      >
        Add
      </button>
    </form>
  );
};

export default AddTransactionComponent;