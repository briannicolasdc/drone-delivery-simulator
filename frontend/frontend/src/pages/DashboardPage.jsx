import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardPage() {
    const [drones, setDrones] = useState([]);
    const [rota, setRota] = useState(null);

    async function loadStatus() {
        const d = await api.getDronesStatus();
        setDrones(d);
    }
    async function loadRoute() {
        const r = await api.getSimulationRoute();
        setRota(r);
    }

    useEffect(() => {
        loadStatus();
        loadRoute();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <section>
                <h3>Drones</h3>
                <ul>
                    {drones.map(dr => (
                        <li key={dr.id}>
                            {dr.id} - bateria: {dr.bateria}% - status: {dr.status}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Roteamento</h3>
                <button onClick={loadRoute}>Recalcular Rota</button>
                {rota ? (
                    <div>
                        {rota.assignments.map(a => (
                            <div key={a.droneId} style={{ marginTop: 10 }}>
                                <strong>{a.droneId}</strong>
                                <ul>
                                    {a.route.map(o => <li key={o.id}>{o.id} - ({o.x},{o.y}) - peso: {o.peso} - prioridade: {o.prioridade}</li>)}
                                </ul>
                            </div>
                        ))}
                        {rota.pendingOrders && rota.pendingOrders.length > 0 && (
                            <div style={{ marginTop: 10 }}>
                                <strong>Pedidos pendentes (não alocados):</strong>
                                <ul>
                                    {rota.pendingOrders.map(p => <li key={p.id}>{p.id} - ({p.x},{p.y}) - prioridade: {p.prioridade}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : <p>Sem rota calculada</p>}
            </section>
        </div>
    );
}
