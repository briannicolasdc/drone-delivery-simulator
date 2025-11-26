import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  width: 280px;
  background-color: #2b2d31;
  padding: 20px;
  border-radius: 8px;
  color: #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h3`
  margin-top: 0;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
`;

const TimeText = styled.p`
  font-size: 1.1em;
  font-weight: bold;
`;

const SectionTitle = styled.h4`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DronesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DroneCard = styled.div`
  background-color: #383a40;
  padding: 10px;
  border-radius: 6px;
  border-left: 4px solid ${(props) => props.$batteryColor};
`;

const DroneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DroneStatus = styled.span`
  font-size: 0.9em;
  color: #aaa;
`;

const BatteryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85em;
`;

const BatteryBar = styled.div`
  flex: 1;
  height: 6px;
  background-color: #555;
  border-radius: 3px;
  overflow: hidden;
`;

const BatteryFill = styled.div`
  width: ${(props) => props.$level}%;
  height: 100%;
  background-color: ${(props) => props.$color};
  transition: width 0.5s ease;
`;

const DronePosition = styled.div`
  font-size: 0.8em;
  color: #888;
  margin-top: 4px;
`;

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 0.9em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LegendColor = styled.span`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.$color};
  border-radius: ${(props) => (props.$circle ? '50%' : '2px')};
`;

export default function StatusPanel({ time, drones }) {
  return (
    <PanelContainer>
      <Title>Status da Simulação</Title>
      <TimeText>⏱ Tempo: {time}</TimeText>

      <SectionTitle>Drones</SectionTitle>
      <DronesList>
        {drones.map((d) => {
          let batteryColor = '#22c55e'; // Green
          if (d.battery < 50) batteryColor = '#eab308'; // Yellow
          if (d.battery < 20) batteryColor = '#ef4444'; // Red

          return (
            <DroneCard key={d.id} $batteryColor={batteryColor}>
              <DroneHeader>
                <strong>Drone {d.id}</strong>
                <DroneStatus>{d.status}</DroneStatus>
              </DroneHeader>
              <BatteryContainer>
                <span>🔋 {Math.round(d.battery)}%</span>
                <BatteryBar>
                  <BatteryFill $level={d.battery} $color={batteryColor} />
                </BatteryBar>
              </BatteryContainer>
              <DronePosition>
                Pos: ({Math.round(d.x)}, {Math.round(d.y)})
              </DronePosition>
            </DroneCard>
          );
        })}
      </DronesList>

      <SectionTitle>Legenda</SectionTitle>
      <LegendList>
        <LegendItem>
          <LegendColor $color="#f59e0b" /> Pendente
        </LegendItem>
        <LegendItem>
          <LegendColor $color="#39e75f" /> Entregue
        </LegendItem>
        <LegendItem>
          <LegendColor $color="#ef4444" $circle /> Drone
        </LegendItem>
        <LegendItem>
          <LegendColor $color="#3b82f6" $circle /> Base
        </LegendItem>
      </LegendList>
    </PanelContainer>
  );
}
