'use client';
import React, { useState } from 'react';
import RecentActivityTable from "@/app/Components/recent_activity_table";
import Dashboard_component from "@/app/Components/dashboard_component";
import MyLineChart from "@/app/Components/line_chart";
import MyPieChart from "@/app/Components/pie_chart";
import Sidebar from "@/app/Components/sidebar";

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const expenseData = [
        { month: 'Jan', expense: 1200, income: 3000 },
        { month: 'Feb', expense: 1500, income: 3200 },
        { month: 'Mar', expense: 1100, income: 3100 },
        { month: 'Apr', expense: 1400, income: 3400 },
        { month: 'May', expense: 1300, income: 3300 },
        { month: 'Jun', expense: 1600, income: 3500 },
        { month: 'Jul', expense: 1700, income: 3600 },
        { month: 'Aug', expense: 1800, income: 3700 },
        { month: 'Sep', expense: 1900, income: 3800 },
        { month: 'Oct', expense: 2000, income: 4000 },
        { month: 'Nov', expense: 2100, income: 4100 },
        { month: 'Dec', expense: 2200, income: 4200 }
    ];

    const pieData = [
        { Category: 'Food', value: 400 },
        { Category: 'Transport', value: 300 },
        { Category: 'Bills', value: 500 },
        { Category: 'Entertainment', value: 200 },
    ];

    const recentTransactions = [
        {
            name: "Groceries",
            value: 400,
            date: "2024-01-15",
            type: "expense",
            category: "Food",
            id: 1
        },
        {
            name: "Utilities",
            value: 300,
            date: "2024-01-14",
            type: "expense",
            category: "Bills",
            id: 2
        },
    ];

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
            <div className={`flex-1 ml-64 p-6 bg-gray-50 min-h-screen transition-all`}>
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

                {/* Dashboard Components */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Dashboard_component title="Total Balance" value={5000} />
                    <Dashboard_component title="Total Income" value={8000} />
                    <Dashboard_component title="Total Expenses" value={3000} />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <MyLineChart expense_data={expenseData} />
                    <MyPieChart data={pieData} />
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-[#363B64] mb-4">Recent Transactions</h3>
                    <RecentActivityTable transaction={recentTransactions} />
                </div>

                {/* Add Transaction Button */}
                <button className="fixed bottom-8 right-8 bg-[#6c63ff] text-white rounded-full p-4 shadow-lg hover:bg-[#5147ff] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;