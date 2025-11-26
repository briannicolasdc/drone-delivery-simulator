import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react';
import api from '../services/api';

const SimulationContext = createContext();

export function SimulationProvider({ children }) {
  const [drones, setDrones] = useState([]);
  const [rota, setRota] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStatus = useCallback(async () => {
    try {
      const d = await api.getDronesStatus();
      setDrones(d);
    } catch (error) {
      console.error('Error loading status:', error);
    }
  }, []);

  const loadRoute = useCallback(async () => {
    try {
      const r = await api.getSimulationRoute();
      setRota(r);
    } catch (error) {
      console.error('Error loading route:', error);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await Promise.all([loadStatus(), loadRoute()]);
    setLoading(false);
  }, [loadStatus, loadRoute]);

  const recalculate = useCallback(async () => {
    setLoading(true);
    // Assuming api.computeRoutes exists or we trigger it via getSimulationRoute if it auto-calcs?
    // The previous code called api.getSimulationRoute() which seemed to just fetch.
    // Wait, the backend computeRoute is called on GET /simulacoes/rota?
    // Let's check backend controller.
    // Yes, getSimulationRoute calls computeRoute(). So calling loadRoute() is enough to recalculate?
    // Actually, usually GET should be idempotent. But here it seems to trigger computation.
    // Let's assume calling loadRoute() is "Recalcular".
    await loadRoute();
    setLoading(false);
  }, [loadRoute]);

  // Auto-refresh
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <SimulationContext.Provider
      value={{ drones, rota, loading, refresh, recalculate }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  return useContext(SimulationContext);
}
