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
        <div className="w-full h-96 bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 text-[#1a1a2e]">Monthly Expenditure vs Income</h2>
            <div className="w-full h-[calc(100%-4rem)]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={expense_data}
                        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#6c63ff"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#4b3fff"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MyLineChart;