const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

router.post('/pedidos', deliveryController.createOrder);
router.get('/pedidos', deliveryController.getOrders);
router.post('/pedidos/:id/entregar', deliveryController.markAsDelivered);
router.get('/drones/status', deliveryController.getDronesStatus);
router.get('/simulacoes/rota', deliveryController.getSimulationRoute);

module.exports = router;
