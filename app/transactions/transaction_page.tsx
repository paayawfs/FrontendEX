'use client';
import React, { useState, useMemo } from 'react';
import DeleteTransactionModal from '../Components/delete_transaction_component';
import AddTransactionComponent from '../Components/add_transaction_component';
import Sidebar from '../Components/sidebar';

interface Transaction {
    id: number;
    name: string;
    value: number;
    date: string;
    type: 'income' | 'expense';
    category: string;
}

interface FilterState {
    category: string;
    startDate: string;
    endDate: string;
}

const TransactionsPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 1,
            name: "Salary",
            value: 5000,
            date: "2024-01-25",
            type: "income",
            category: "Salary"
        },
        {
            id: 2,
            name: "Groceries",
            value: 400,
            date: "2024-01-24",
            type: "expense",
            category: "Food"
        },
        {
            id: 3,
            name: "Rent",
            value: 1200,
            date: "2024-01-20",
            type: "expense",
            category: "Bills"
        },
        {
            id: 4,
            name: "Freelance Work",
            value: 2000,
            date: "2024-01-18",
            type: "income",
            category: "Other"
        },
        {
            id: 5,
            name: "Uber Rides",
            value: 150,
            date: "2024-01-15",
            type: "expense",
            category: "Transport"
        },
        {
            id: 6,
            name: "Movie Night",
            value: 80,
            date: "2024-01-14",
            type: "expense",
            category: "Entertainment"
        },
        {
            id: 7,
            name: "Medical Checkup",
            value: 300,
            date: "2024-01-12",
            type: "expense",
            category: "Healthcare"
        },
        {
            id: 8,
            name: "Online Course",
            value: 200,
            date: "2024-01-10",
            type: "expense",
            category: "Education"
        },
        {
            id: 9,
            name: "Investment Return",
            value: 1500,
            date: "2024-01-08",
            type: "income",
            category: "Investment"
        },
        {
            id: 10,
            name: "Internet Bill",
            value: 100,
            date: "2024-01-05",
            type: "expense",
            category: "Bills"
        }
    ]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        category: '',
        startDate: '',
        endDate: ''
    });

    const categories = [
        'All',
        'Food',
        'Transport',
        'Bills',
        'Entertainment',
        'Healthcare',
        'Education',
        'Salary',
        'Investment',
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

    const handleDeleteConfirm = () => {
        if (selectedTransaction) {
            const updatedTransactions = transactions.filter(
                transaction => transaction.id !== selectedTransaction.id
            );
            setTransactions(updatedTransactions);
            setIsDeleteModalOpen(false);
            setSelectedTransaction(null);
        }
    };

    const handleDeleteClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsDeleteModalOpen(true);
    };

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
                {/* Toggle Button */}
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
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {transaction.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {transaction.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                            ₵{transaction.value.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            transaction.type === 'income'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <button
                                            onClick={() => handleDeleteClick(transaction)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Transaction Button */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="fixed bottom-8 right-8 bg-[#6c63ff] text-white rounded-full p-4 shadow-lg hover:bg-[#5147ff] transition-colors"
                    aria-label="Add transaction"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>

                {/* Delete Modal */}
                <DeleteTransactionModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDeleteConfirm}
                    transactionName={selectedTransaction?.name || ''}
                    transactionAmount={selectedTransaction?.value || 0}
                />

                {/* Add Transaction Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-[#1a1a2e]">Add Transaction</h2>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <AddTransactionComponent />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionsPage;