import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartData {
  cid: string;
  count: number;
  color: string;
}

const getColor = (count: number, maxCount: number): string => {
  const normalized = count / maxCount;
  if (normalized < 0.5) {
    const green = Math.min(255, Math.floor(255 * (1 - 2 * normalized)));
    return `rgb(0, ${green}, 0)`;
  } else if (normalized === 0.5) {
    return `rgb(255, 255, 0)`;
  } else {
    const red = Math.min(255, Math.floor(255 * (2 * (normalized - 0.5))));
    return `rgb(${red}, 0, 0)`;
  }
};

const BarChartDashboard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const fetchAtestado = async () => {
    try {
      const response = await fetch('http://localhost:3000/atestado');
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados');
      }

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (!Array.isArray(data.atestado)) {
        console.error('A propriedade "atestado" não é um array');
        return;
      }

      const cidCounts = data.atestado.reduce((acc: Record<string, number>, item: any) => {
        acc[item.cid_nome] = (acc[item.cid_nome] || 0) + 1;
        return acc;
      }, {});

      const formattedData: ChartData[] = Object.entries(cidCounts).map(([cid, count]) => ({
        cid,
        count: Number(count),
        color: '',
      }));

      const maxCount = Math.max(...formattedData.map(item => item.count));

      const updatedData = formattedData.map(item => ({
        ...item,
        color: getColor(item.count, maxCount),
      }));

      setChartData(updatedData);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };

  useEffect(() => {
    fetchAtestado();
  }, []);

  return (
    <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cid" label={{ value: 'CIDs', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Frequência', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="count" name="Frequência">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
