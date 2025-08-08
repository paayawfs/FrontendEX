'use client';
import React from 'react';
import Dashboard from './Dashboard/Dashboard';

export default function Page() {
    return (
        <main> {/* ml-64 adds margin to account for sidebar width */}
            <Dashboard />
        </main>
    );
}