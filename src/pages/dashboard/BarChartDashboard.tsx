import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const calculateStats = (data: ChartData[]) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const mean = total / data.length;
  const max = Math.max(...data.map(item => item.count));
  const min = Math.min(...data.map(item => item.count));
  const variance = data.reduce((sum, item) => sum + Math.pow(item.count - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);

  return { total, mean, max, min, stdDev };
};

const BarChartDashboard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    mean: 0,
    max: 0,
    min: 0,
    stdDev: 0,
  });

  const fetchAtestado = async () => {
    try {
      const response = await fetch('http://192.168.126.203:3000/atestado');
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
      setStats(calculateStats(updatedData));
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };

  useEffect(() => {
    fetchAtestado();
  }, []);

  return (
    <View style={styles.container}>
      {/* Substituindo Appbar por um cabeçalho simples */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Gráfico de Frequências</Text>
      </View>

      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="70%">
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
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Estatísticas</Text>
        <Text><Text style={styles.boldText}>A soma total das frequências é:</Text> {stats.total}</Text>
        <Text><Text style={styles.boldText}>Em média, cada CID aparece cerca de:</Text> {stats.mean.toFixed(2)} vezes</Text>
        <Text><Text style={styles.boldText}>Máximo:</Text> {stats.max}</Text>
        <Text><Text style={styles.boldText}>Mínimo:</Text> {stats.min}</Text>
        <Text><Text style={styles.boldText}>Desvio Padrão de:</Text> {stats.stdDev.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  statsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default BarChartDashboard;
