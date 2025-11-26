import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import StatusPanel from './StatusPanel';

const GRID_SIZE = 40;
const CELL_SIZE = 15; // pixels per unit
const SPEED = 0.02; // units per tick (Slower for visibility)
const BATTERY_CONSUMPTION_MOVE = 0.1;
const BATTERY_CONSUMPTION_DELIVER = 2.0;

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  font-family: sans-serif;
  justify-content: center;
`;

const MapContainer = styled.div`
  position: relative;
  width: ${GRID_SIZE * CELL_SIZE}px;
  height: ${GRID_SIZE * CELL_SIZE}px;
  background-color: #f0f0f0;
  background-image:
    linear-gradient(to right, #ddd 1px, transparent 1px),
    linear-gradient(to bottom, #ddd 1px, transparent 1px);
  background-size: ${CELL_SIZE}px ${CELL_SIZE}px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const BaseStation = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  background-color: #3b82f6;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const OrderPoint = styled.div`
  position: absolute;
  left: ${(props) => props.$x * CELL_SIZE}px;
  bottom: ${(props) => props.$y * CELL_SIZE}px;
  width: 14px;
  height: 14px;
  background-color: ${(props) =>
    props.$status === 'delivered' ? '#39e75f' : '#f59e0b'};
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transform: translate(-50%, 50%);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const DronePoint = styled.div`
  position: absolute;
  left: ${(props) => props.$x * CELL_SIZE}px;
  bottom: ${(props) => props.$y * CELL_SIZE}px;
  width: 16px;
  height: 16px;
  background-color: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
  transform: translate(-50%, 50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;

export default function SimulationMap({ route }) {
  const [drones, setDrones] = useState([]);
  const [orders, setOrders] = useState([]);
  const [time, setTime] = useState(0);
  const requestRef = useRef();

  // Initialize simulation state when route changes
  useEffect(() => {
    if (!route || !route.assignments) return;

    setDrones((prevDrones) => {
      return route.assignments.map((a) => {
        const existing = prevDrones.find((d) => d.id === a.droneId);
        const startX = existing ? existing.x : 0;
        const startY = existing ? existing.y : 0;
        const battery = existing ? existing.battery : 100;

        return {
          id: a.droneId,
          alcance: a.alcance, // Store range
          x: startX,
          y: startY,
          battery: battery,
          status: a.route.length > 0 ? 'moving' : 'idle',
          currentOrderIndex: 0, // Backend returns remaining route, so we start at 0
          route: a.route,
          target: a.route.length > 0 ? a.route[0] : null
        };
      });
    });

    // Flatten all orders for easy rendering
    const allOrders = route.assignments.flatMap((a) =>
      a.route.map((o) => ({
        ...o,
        status: 'pending'
      }))
    );

    setOrders(allOrders);
  }, []);

  // Simulation Loop
  useEffect(() => {
    if (!drones.length) return;

    const tick = () => {
      setDrones((prevDrones) => {
        return prevDrones.map((drone) => {
          if (!drone.target) return { ...drone, status: 'idle' };

          const dx = drone.target.x - drone.x;
          const dy = drone.target.y - drone.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const consumption = (100 * SPEED) / (drone.alcance || 20); // Default to 20 if missing

          if (dist < SPEED) {
            // Arrived at target
            const nextIndex = drone.currentOrderIndex + 1;
            const nextTarget =
              nextIndex < drone.route.length ? drone.route[nextIndex] : null;

            return {
              ...drone,
              x: drone.target.x,
              y: drone.target.y,
              currentOrderIndex: nextIndex,
              target: nextTarget,
              status: nextTarget ? 'moving' : 'idle',
              battery: Math.max(0, drone.battery - BATTERY_CONSUMPTION_DELIVER)
            };
          } else {
            // Move towards target
            const angle = Math.atan2(dy, dx);
            return {
              ...drone,
              x: drone.x + Math.cos(angle) * SPEED,
              y: drone.y + Math.sin(angle) * SPEED,
              status: 'moving',
              battery: Math.max(0, drone.battery - consumption)
            };
          }
        });
      });

      setTime((t) => t + 1);
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, [drones.length]);

  // Effect to update order status when a drone reaches a target
  useEffect(() => {
    setOrders((prevOrders) => {
      const newOrders = [...prevOrders];
      drones.forEach((drone) => {
        newOrders.forEach((order) => {
          if (order.status === 'delivered') return;

          const dx = drone.x - order.x;
          const dy = drone.y - order.y;
          if (Math.sqrt(dx * dx + dy * dy) < 0.5) {
            if (drone.route.some((r) => r.id === order.id)) {
              order.status = 'delivered';
              // Call API to persist delivery
              api
                .markAsDelivered(order.id)
                .catch((err) =>
                  console.error('Failed to mark delivered:', err)
                );
            }
          }
        });
      });
      return newOrders;
    });
  }, [drones]);

  return (
    <Container>
      {/* Map Container */}
      <MapContainer>
        {/* Origin */}
        <BaseStation title="Base" />

        {/* Orders */}
        {orders.map((o) => (
          <OrderPoint
            key={o.id}
            $x={o.x}
            $y={o.y}
            $status={o.status}
            title={`Pedido ${o.id} (${o.status})`}
          >
            {o.status === 'delivered' ? '✓' : '📦'}
          </OrderPoint>
        ))}

        {/* Drones */}
        {drones.map((d) => (
          <DronePoint
            key={d.id}
            $x={d.x}
            $y={d.y}
            title={`Drone ${d.id} (${Math.round(d.battery)}%)`}
          >
            🚁
          </DronePoint>
        ))}
      </MapContainer>

      {/* Status Panel */}
      <StatusPanel time={time} drones={drones} />
    </Container>
  );
}
