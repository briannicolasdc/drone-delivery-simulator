import React from 'react';
import styled from 'styled-components';
import SimulationMap from '../components/SimulationMap';
import { useSimulation } from '../context/SimulationContext';

const PageContainer = styled.div`
  /* Add any container styles if needed */
`;

const Section = styled.section`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const MissionTime = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  font-weight: bold;
`;

const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DronesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const DroneCard = styled.div`
  background-color: #2b2d31;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
`;

const DroneHeader = styled.div`
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const DroneTitle = styled.strong`
  font-size: 1.1em;
  color: #61dafb;
`;

const DroneInfo = styled.div`
  font-size: 0.85em;
  color: #aaa;
  margin-top: 5px;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  background-color: #383a40;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9em;
  border-left: 3px solid
    ${(props) =>
      props.$priority === 'alta'
        ? '#ef4444'
        : props.$priority === 'media'
          ? '#eab308'
          : '#22c55e'};
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderDetails = styled.div`
  margin-top: 5px;
  font-size: 0.85em;
  color: #ccc;
`;

const EmptyState = styled.li`
  color: #888;
  font-style: italic;
`;

const PendingOrdersContainer = styled.div`
  background-color: #2b2d31;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
  border-left: 4px solid #f59e0b;
`;

const PendingTitle = styled.strong`
  font-size: 1.1em;
  display: block;
  margin-bottom: 15px;
`;

const PendingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
`;

const PendingItem = styled.div`
  background-color: #383a40;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9em;
`;

const PendingItemTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const PendingItemInfo = styled.div`
  color: #aaa;
`;

const NoRouteMessage = styled.p`
  text-align: center;
  color: #888;
`;

const MapSection = styled.section`
  margin-top: 20px;
`;

export default function DashboardPage() {
  const { rota } = useSimulation();

  return (
    <PageContainer>
      <Section>
        <Title>Roteamento</Title>
        {rota && rota.totalMissionTime > 0 && (
          <MissionTime>
            ⏱ Tempo Total Estimado da Missão: {rota.totalMissionTime} ticks
          </MissionTime>
        )}
        {rota ? (
          <RouteContainer>
            <DronesGrid>
              {rota.assignments.map((a) => (
                <DroneCard key={a.droneId}>
                  <DroneHeader>
                    <DroneTitle>Drone {a.droneId}</DroneTitle>
                    <DroneInfo>
                      Dist: {a.totalDistance} | Tempo: {a.estimatedTime}
                    </DroneInfo>
                  </DroneHeader>
                  <OrderList>
                    {a.route.map((o, index) => (
                      <OrderItem key={o.id} $priority={o.prioridade}>
                        <OrderHeader>
                          <strong>
                            #{index + 1} - Pedido {o.id.substring(0, 8)}...
                          </strong>
                          <span style={{ fontSize: '0.8em', color: '#aaa' }}>
                            ({o.x}, {o.y})
                          </span>
                        </OrderHeader>
                        <OrderDetails>
                          Peso: {o.peso}kg • Prioridade: {o.prioridade}
                        </OrderDetails>
                      </OrderItem>
                    ))}
                    {a.route.length === 0 && (
                      <EmptyState>Sem entregas atribuídas</EmptyState>
                    )}
                  </OrderList>
                </DroneCard>
              ))}
            </DronesGrid>

            {rota.pendingOrders && rota.pendingOrders.length > 0 && (
              <PendingOrdersContainer>
                <PendingTitle>📦 Pedidos Pendentes (Não Alocados)</PendingTitle>
                <PendingGrid>
                  {rota.pendingOrders.map((p) => (
                    <PendingItem key={p.id}>
                      <PendingItemTitle>
                        {p.id.substring(0, 8)}...
                      </PendingItemTitle>
                      <PendingItemInfo>
                        Loc: ({p.x}, {p.y}) • Prioridade: {p.prioridade}
                      </PendingItemInfo>
                    </PendingItem>
                  ))}
                </PendingGrid>
              </PendingOrdersContainer>
            )}
          </RouteContainer>
        ) : (
          <NoRouteMessage>
            Sem rota calculada. Clique em "Recalcular Rota" para iniciar.
          </NoRouteMessage>
        )}
      </Section>

      {rota && (
        <MapSection>
          <h3>Mapa da Simulação</h3>
          <SimulationMap route={rota} />
        </MapSection>
      )}
    </PageContainer>
  );
}
