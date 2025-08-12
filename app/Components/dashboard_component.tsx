import React from "react";

interface DashboardComponentProps {
    title: string;
    value: number;
}

export default function Dashboard_component({ title, value }: DashboardComponentProps) {
    return (
        <div className="w-64 h-40 bg-white rounded-xl shadow-lg border-l-4 border-[#6c63ff] p-6">
            <div className="h-full flex flex-col justify-between">
                <h3 className="text-gray-600 text-base font-medium">
                    {title}
                </h3>
                <div className="flex items-end">
                    <span className="text-3xl font-bold text-[#1a1a2e]">
                        ₵{value}
                    </span>
                </div>
            </div>
        </div>
    );
}