import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import OrdersPage from './pages/OrdersPage';
import DashboardPage from './pages/DashboardPage';
import OrderStatusPage from './pages/OrderStatusPage';
import Header from './components/Header';
import { SimulationProvider, useSimulation } from './context/SimulationContext';

const AppContainer = styled.div`
  text-align: center;
  align-content: center;
  padding: 20px;
`;

function AppContent() {
  const { refresh, recalculate } = useSimulation();

  return (
    <AppContainer>
      <GlobalStyles />
      <Header onRefresh={refresh} onRecalculate={recalculate} />
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/status" element={<OrderStatusPage />} />
      </Routes>
    </AppContainer>
  );
}

function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SimulationProvider>
  );
}

export default App;
