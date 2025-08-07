'use client';
import React from "react";




import Recent_activity_table from "@/app/Components/recent_activity_table";

const recentActivityData = [
    { name: "Groceries", value: 400 },
    { name: "Utilities", value: 300 },
    { name: "Entertainment", value: 300 },
    { name: "Transport", value: 200 },
];

export default function Home(){
    return (
        <main>
            <recentActivityTable data={recentActivityData}/>
        </main>

    );
}