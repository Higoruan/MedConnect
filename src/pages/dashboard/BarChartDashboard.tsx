import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Janeiro', vendas: 4000, lucro: 2400 },
  { name: 'Fevereiro', vendas: 3000, lucro: 1398 },
  { name: 'Março', vendas: 2000, lucro: 9800 },
  { name: 'Abril', vendas: 2780, lucro: 3908 },
  { name: 'Maio', vendas: 1890, lucro: 4800 },
  { name: 'Junho', vendas: 2390, lucro: 3800 },
  { name: 'Julho', vendas: 3490, lucro: 4300 },
];

const BarChartDashboard: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
          <Bar dataKey="lucro" fill="#82ca9d" name="Lucro" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
