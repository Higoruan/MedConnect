import React, { useState } from 'react';
import Header from './Header';
import BarChartDashboard from './BarChartDashboard';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<string>('Gráfico de Barras');

    return (
        <div>
            <Header />
            {activePage === 'Gráfico de Barras' && <BarChartDashboard />}
        </div>
    );
};

export default App;
