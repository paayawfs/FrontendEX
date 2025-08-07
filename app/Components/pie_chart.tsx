'use client';
import React from 'react';
import {Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const colors = ['#430428', 'rgba(196,0,170,0.85)', '#4528ff', '#e8bdbc'];

type PieChartProps = {
    data: { Category: string; value: number }[];
}

const MyPieChart = ({data}:PieChartProps) => {


    return (
        <div className="w-full h-96 bg-white rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">Expense Distribution</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="Category"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );


}
export default MyPieChart;