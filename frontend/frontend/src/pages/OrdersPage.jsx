import React, { useState } from 'react';
import api from '../services/api';

export default function OrdersPage() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [peso, setPeso] = useState(1);
    const [prioridade, setPrioridade] = useState('media');
    const [msg, setMsg] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const order = await api.createOrder({ x: Number(x), y: Number(y), peso: Number(peso), prioridade });
            setMsg(`Pedido criado: ${order.id}`);
        } catch (err) {
            setMsg('Erro ao criar pedido');
            console.error(err);
        }
    }

    return (
        <div>
            <h2>Criar Pedido</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>X: <input type="number" value={x} onChange={e => setX(e.target.value)} /></label>
                </div>
                <div>
                    <label>Y: <input type="number" value={y} onChange={e => setY(e.target.value)} /></label>
                </div>
                <div>
                    <label>Peso (kg): <input type="number" value={peso} onChange={e => setPeso(e.target.value)} /></label>
                </div>
                <div>
                    <label>Prioridade:
                        <select value={prioridade} onChange={e => setPrioridade(e.target.value)}>
                            <option value="alta">Alta</option>
                            <option value="media">Média</option>
                            <option value="baixa">Baixa</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Enviar Pedido</button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}
