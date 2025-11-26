import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  margin: 0;
`;

const BackButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ColumnContainer = styled.div`
  flex: 1;
  background-color: #2b2d31;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 400px;
`;

const ColumnTitle = styled.h3`
  border-bottom: 3px solid ${(props) => props.$color};
  padding-bottom: 10px;
  margin-bottom: 5px;
  text-align: center;
`;

const ItemsList = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OrderCard = styled.div`
  background-color: #383a40;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-left: 4px solid
    ${(props) =>
      props.$priority === 'alta'
        ? '#ef4444'
        : props.$priority === 'media'
          ? '#eab308'
          : '#22c55e'};
`;

const OrderId = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 0.9em;
`;

const OrderInfo = styled.div`
  font-size: 0.8em;
  color: #aaa;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  margin-top: 20px;
`;

export default function OrderStatusPage() {
  const [orders, setOrders] = useState([]);
  const [route, setRoute] = useState(null);

  async function fetchData() {
    try {
      const ordersData = await api.getOrders();
      setOrders(ordersData);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }

    try {
      const routeData = await api.getSimulationRoute();
      setRoute(routeData);
    } catch (err) {
      console.error('Failed to fetch route:', err);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Categorize orders
  const delivered = orders.filter((o) => o.entregue);

  // Find orders in transit (assigned in route)
  const inTransitIds = new Set();
  if (route && route.assignments) {
    route.assignments.forEach((a) => {
      a.route.forEach((o) => inTransitIds.add(o.id));
    });
  }
  const inTransit = orders.filter((o) => !o.entregue && inTransitIds.has(o.id));

  // Pending are those not delivered and not in transit
  const pending = orders.filter((o) => !o.entregue && !inTransitIds.has(o.id));

  const Column = ({ title, items, color }) => (
    <ColumnContainer>
      <ColumnTitle $color={color}>
        {title} ({items.length})
      </ColumnTitle>

      <ItemsList>
        {items.map((o) => (
          <OrderCard key={o.id} $priority={o.prioridade}>
            <OrderId>#{o.id.substring(0, 8)}...</OrderId>
            <OrderInfo>
              Loc: ({o.x}, {o.y})
            </OrderInfo>
            <OrderInfo>Peso: {o.peso}kg</OrderInfo>
          </OrderCard>
        ))}
        {items.length === 0 && <EmptyState>Vazio</EmptyState>}
      </ItemsList>
    </ColumnContainer>
  );

  return (
    <PageContainer>
      <Header>
        <Title>Status dos Pedidos</Title>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <BackButton>Voltar para Dashboard</BackButton>
        </Link>
      </Header>

      <ColumnsContainer>
        <Column title="Pendente" items={pending} color="#f59e0b" />
        <Column title="A Caminho" items={inTransit} color="#3b82f6" />
        <Column title="Entregue" items={delivered} color="#22c55e" />
      </ColumnsContainer>
    </PageContainer>
  );
}
