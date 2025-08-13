'use client';

import React, { useState } from 'react';
import type { Transaction } from '@/app/types';

interface UpdateTransactionProps {
  transaction: Transaction;
  categories: string[];
  onUpdate: (updatedTransaction: Transaction) => void;
  onCancel: () => void;
}

const UpdateTransactionForm: React.FC<UpdateTransactionProps> = ({
  transaction,
    categories,
  onUpdate,
  onCancel
}) => {
  const [form, setForm] = useState<Transaction>({...transaction});

  const labelClasses = "block text-sm font-medium text-gray-700";
  const inputClasses = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-medium mb-4">Update Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="transactionName"
              name="transactionName"
              value={form.transactionName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="transactionType"
              name="transactionType"
              value={form.transactionType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
          </div>

          <div className="mb-4">
            <label className={labelClasses} htmlFor="category">
              Category
            </label>
            <select
                className={inputClasses}
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
            >
              {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows={2}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Update Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTransactionForm;