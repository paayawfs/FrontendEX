// app/Dashboard/Dashboard.tsx
'use client';
import React, { useState, useEffect } from 'react';
import RecentActivityTable from "@/app/Components/recent_activity_table";
import Dashboard_component from "@/app/Components/dashboard_component";
import MyLineChart from "@/app/Components/line_chart";
import MyPieChart from "@/app/Components/pie_chart";
import Sidebar from "@/app/Components/sidebar";
import { api } from '@/app/Services/api';
import type { Transaction } from '@/app/types';

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        userName: '',
        totalBalance: 0,
        totalIncome: 0,
        totalExpenses: 0
    });
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchAllDashboardData = async () => {
            setIsLoading(true);
            try {
                const [summary, allTransactions] = await Promise.all([
                    api.transactions.getSummary(),
                    api.transactions.getAll()
                ]);

                setDashboardData({
                    userName: summary.name,
                    totalBalance: summary.balance,
                    totalIncome: summary.income,
                    totalExpenses: summary.expenditure
                });

                setTransactions(allTransactions);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllDashboardData();
    }, []);

    // Transform transaction data for the line chart
    const getLineChartData = () => {
        if (!transactions.length) return [];

        // Group transactions by month
        const monthlyData = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });

            if (!acc[monthYear]) {
                acc[monthYear] = { month: monthYear, expense: 0, income: 0 };
            }

            // Add to either expense or income based on transaction type
            if (transaction.transactionType === 'Debit') {
                acc[monthYear].expense += transaction.amount;
            } else if (transaction.transactionType === 'Credit') {
                acc[monthYear].income += transaction.amount;
            }

            return acc;
        }, {} as Record<string, { month: string; expense: number; income: number }>);

        // Convert to array and sort by date
        return Object.values(monthlyData).sort((a, b) => {
            const dateA = new Date(a.month);
            const dateB = new Date(b.month);
            return dateA.getTime() - dateB.getTime();
        });
    };

    // Get category-based pie chart data
    const getCategoryPieData = () => {
        if (!transactions.length) return [];

        // Group expenses by category (only Debit transactions)
        const categoryMap = transactions.reduce((acc, transaction) => {
            if (transaction.transactionType === 'Debit') {
                if (!acc[transaction.category]) {
                    acc[transaction.category] = 0;
                }
                acc[transaction.category] += transaction.amount;
                
            }
            return acc;
        }, {} as Record<string, number>);

        // Convert to array format for pie chart
        return Object.entries(categoryMap).map(([category, amount]) => ({
            Category: category,
            value: amount
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


     const pieChartData = getCategoryPieData();

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} p-6 bg-gray-50 min-h-screen transition-all`}>
                <h1 className="text-3xl font-bold text-center text-[#1a1a2e] mb-8">
                    Hi {dashboardData.userName}!
                </h1>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="fixed top-4 left-4 z-50 bg-[#6c63ff] text-white p-2 rounded-md shadow-lg hover:bg-[#5147ff]"
                    aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>


                {/* Dashboard Components */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Dashboard_component title="Total Balance" value={dashboardData.totalBalance} />
                    <Dashboard_component title="Total Income" value={dashboardData.totalIncome} />
                    <Dashboard_component title="Total Expenses" value={dashboardData.totalExpenses} />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <MyLineChart expense_data={getLineChartData()} />
                    <MyPieChart data={pieChartData} />
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-[#363B64] mb-4">Recent Transactions</h3>
                    <RecentActivityTable transaction={transactions} />
                </div>


            </div>
        </div>
    );
};

export default Dashboard;