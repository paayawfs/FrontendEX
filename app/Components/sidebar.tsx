'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RiDashboardLine, RiExchangeDollarLine } from 'react-icons/ri';

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const navItems = [
        {
            path: '/',
            name: 'Dashboard',
            icon: <RiDashboardLine className="text-xl" />
        },
        {
            path: '/transactions',
            name: 'Transactions',
            icon: <RiExchangeDollarLine className="text-xl" />
        }
    ];

    return (
        <aside className="h-screen w-64 bg-[#242450] fixed left-0 top-0">
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <Image
                        src="/Resources/walletImage.png"
                        alt="Wallet logo"
                        width={40}
                        height={40}
                    />
                    <h1 className="text-xl font-bold text-white">
                        Expense Tracker App
                    </h1>
                </div>
            </div>

            <nav className="mt-6">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center px-4 py-3 mb-2 transition-colors ${
                            pathname === item.path
                                ? 'bg-[#6c63ff] text-white'
                                : 'text-gray-300 hover:bg-[#2a2a3e]'
                        }`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;