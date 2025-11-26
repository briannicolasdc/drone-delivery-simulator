const { computeRoute } = require('../services/simulationService');
const { addOrder, getOrders } = require('../services/deliveryService');
const { getDrones } = require('../services/droneService');

exports.createOrder = (req, res) => {
  try {
    const { x, y, peso, prioridade } = req.body;

    // Validations
    if (typeof x !== 'number' || typeof y !== 'number') {
      return res
        .status(400)
        .json({ error: 'Coordenadas x e y devem ser números.' });
    }
    if (typeof peso !== 'number' || peso <= 0) {
      return res
        .status(400)
        .json({ error: 'Peso deve ser um número positivo.' });
    }

    // Check capacity
    const drones = getDrones();
    const maxCapacity = Math.max(...drones.map((d) => d.capacidade));
    if (peso > maxCapacity) {
      return res.status(400).json({
        error: `Peso excede a capacidade máxima disponível (${maxCapacity}kg).`
      });
    }

    const order = addOrder({ x, y, peso, prioridade: prioridade || 'media' });
    return res.status(201).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

exports.getOrders = (req, res) => {
  return res.json(getOrders());
};

exports.markAsDelivered = (req, res) => {
  const { id } = req.params;
  const order = require('../services/deliveryService').markAsDelivered(id);
  if (order) {
    return res.json(order);
  }
  return res.status(404).json({ error: 'Pedido não encontrado' });
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
