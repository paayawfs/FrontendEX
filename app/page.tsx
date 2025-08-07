// app/page.tsx
'use client';
import React from "react";
import RecentActivityTable from "@/app/Components/recent_activity_table";
import Add_transaction_component from "@/app/Components/add_transaction_component";

const recentActivityData = [
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
    // ... other items with complete data
];

export default function Home() {
    return (
        <main>
            <Add_transaction_component/>
        </main>
    );
}