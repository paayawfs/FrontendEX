'use client';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';




    type MyLineChartProps = {
        expense_data: { month: string; expense: number; income: number }[];
    };

const MyLineChart = ({expense_data}: MyLineChartProps) => {
    return(
        <div className="w-full h-96 bg-white rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">Product Sales</h2>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={expense_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="expense" stroke="#21A6EB" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="income" stroke="#FC5DE7" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
export default MyLineChart;