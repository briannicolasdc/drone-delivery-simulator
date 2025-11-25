const { computeRoute } = require('../services/simulationService');
const { addOrder, getOrders } = require('../services/deliveryService');
const { getDrones } = require('../services/droneService');

exports.createOrder = (req, res) => {
    try {
        const { x, y, peso, prioridade } = req.body;
        if (typeof x !== 'number' || typeof y !== 'number') {
            return res.status(400).json({ error: 'x e y devem ser números' });
        }
        const order = addOrder({ x, y, peso: peso || 0, prioridade: prioridade || 'media' });
        return res.status(201).json(order);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
};

exports.getDronesStatus = (req, res) => {
    return res.json(getDrones());
};

exports.getSimulationRoute = (req, res) => {
    try {
        const route = computeRoute();
        return res.json(route);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao calcular rota' });
    }
};
