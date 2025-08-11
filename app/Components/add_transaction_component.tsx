// app/Components/add_transaction_component.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/Services/api';
import type { TransactionData } from '@/app/types';

const AddTransactionComponent: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Define categories
    const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'];

    // Updated to match the TransactionData interface
    const [formData, setFormData] = useState<TransactionData>({
        transactionName: '',
        amount: 0,
        transactionType: 'Debit',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await api.transactions.add(formData);
            router.push('/transactions');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add transaction');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const inputClasses = "shadow-sm border rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#6c63ff] focus:border-transparent transition-all";
    const labelClasses = "block text-[#1a1a2e] text-sm font-medium mb-2";

    return (
        <div className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4 border-l-4 border-[#6c63ff]">
                <h2 className="text-2xl font-bold mb-6 text-[#1a1a2e]">Add Transaction</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="transactionName">
                        Name
                    </label>
                    <input
                        className={inputClasses}
                        type="text"
                        id="transactionName"
                        name="transactionName"
                        value={formData.transactionName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClasses} htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className={inputClasses}
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className={labelClasses} htmlFor="transactionType">
                            Type
                        </label>
                        <select
                            className={inputClasses}
                            id="transactionType"
                            name="transactionType"
                            value={formData.transactionType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Debit">Expense</option>
                            <option value="Credit">Income</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelClasses} htmlFor="category">
                            Category
                        </label>
                        <select
                            className={inputClasses}
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className={labelClasses} htmlFor="amount">
                            Amount
                        </label>
                        <input
                            className={inputClasses}
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClasses} htmlFor="date">
                            Date
                        </label>
                        <input
                            className={inputClasses}
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#6c63ff] hover:bg-[#5147ff] text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#6c63ff] focus:ring-opacity-50 disabled:bg-gray-400"
                >
                    {isLoading ? 'Adding...' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
};

export default AddTransactionComponent;