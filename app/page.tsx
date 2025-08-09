'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Dashboard from './Dashboard/Dashboard';
import TransactionsPage from "./transactions/transaction_page";

export default function Page() {
    const pathname = usePathname();

    return (
        <main>
            {pathname === '/' && <Dashboard />}
            {pathname === '/transactions' && <TransactionsPage />}
        </main>
    );
}