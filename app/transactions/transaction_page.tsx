'use client';
import React, { useState, useEffect, useMemo } from 'react';
import DeleteTransactionModal from '../Components/delete_transaction_component';
import UpdateTransactionForm from '@/app/Components/update_transaction';
import Sidebar from '../Components/sidebar';
import { api } from '@/app/Services/api';
import type { Transaction, TransactionData } from '@/app/types';
import AddTransactionComponent from '../Components/add_transaction_component';

interface FilterState {
    category: string;
    startDate: string;
    endDate: string;
}

const TransactionsPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        category: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                const data = await api.transactions.getAll();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const categories = [
        'All',
        'Food',
        'Transport',
        'Bills',
        'Entertainment',
        'Healthcare',
        'Education',
        'Other'
    ];

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(transaction => {
                const matchesCategory = !filters.category || filters.category === 'All'
                    || transaction.category === filters.category;
                const matchesDateRange = (!filters.startDate || transaction.date >= filters.startDate)
                    && (!filters.endDate || transaction.date <= filters.endDate);
                return matchesCategory && matchesDateRange;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, filters]);

    const handleDeleteConfirm = async () => {
        if (selectedTransaction) {
            try {
                await api.transactions.delete(selectedTransaction.id);
                setTransactions(transactions.filter(t => t.id !== selectedTransaction.id));
                setIsDeleteModalOpen(false);
                setSelectedTransaction(null);
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    const handleDeleteClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsDeleteModalOpen(true);
    };

    const handleEditClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsEditMode(true);
    };

    const handleUpdateTransaction = async (updatedTransaction: Transaction) => {
        try {
            await api.transactions.update?.(updatedTransaction.id, updatedTransaction);
            setTransactions(transactions.map(t =>
                t.id === updatedTransaction.id ? updatedTransaction : t
            ));
            setIsEditMode(false);
            setSelectedTransaction(null);
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setSelectedTransaction(null);
    };


    const handleAddTransaction = async (newTransaction: TransactionData) => {
      try {
        const addedTransaction = await api.transactions.add(newTransaction);

        // @ts-ignore
          setTransactions([addedTransaction, ...transactions]);
        setIsAddMode(false);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
                <Sidebar />
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute left-0 right-0 mx-auto w-fit top-[50%] bg-[#6c63ff] text-white p-2 rounded-full shadow-lg hover:bg-[#5147ff] transition-colors"
                    aria-label="Close sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} p-6 bg-gray-50 min-h-screen transition-all`}>
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="fixed top-4 left-4 z-50 bg-[#6c63ff] text-white p-2 rounded-md shadow-lg hover:bg-[#5147ff]"
                        aria-label="Open sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}

                <h1 className="text-2xl font-bold text-[#363B64] mb-6">Manage Transactions</h1>

                {isEditMode && selectedTransaction ? (
                    <UpdateTransactionForm
                        transaction={selectedTransaction}
                        onUpdate={handleUpdateTransaction}
                        onCancel={handleCancelEdit}
                    />
                ) : isAddMode ? (
                    <div className="mb-6">
                        <AddTransactionComponent onAdd = {handleAddTransaction} />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsAddMode(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Filter Section */}
                        <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#6c63ff]"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.startDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#6c63ff]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.endDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#6c63ff]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Transactions Table */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredTransactions.length > 0 ? (
                                        filteredTransactions.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(transaction.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {transaction.transactionName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {transaction.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <span className={transaction.transactionType === 'Credit' ? 'text-green-600' : 'text-red-600'}>
                                                        ₵{transaction.amount.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        transaction.transactionType === 'Credit'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {transaction.transactionType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                    <button
                                                        onClick={() => handleEditClick(transaction)}
                                                        className="text-blue-500 hover:text-blue-700 transition-colors mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(transaction)}
                                                        className="text-red-500 hover:text-red-700 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                No transactions found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}



                {/* Delete Modal */}
                <DeleteTransactionModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDeleteConfirm}
                    transactionName={selectedTransaction?.transactionName || ''}
                    transactionAmount={selectedTransaction?.amount || 0}
                />


                {/* Floating Add Button */}
                {!isEditMode && !isAddMode && (
                    <button
                        onClick={() => setIsAddMode(true)}
                        className="fixed bottom-8 right-8 bg-[#6c63ff] text-white rounded-full p-4 shadow-lg hover:bg-[#5147ff] transition-colors"
                        aria-label="Add transaction"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                )}

            </div>
        </div>
    );
};

export default TransactionsPage;