const { addOrder, getOrders, computeRoute, getDrones } = require('../services/simulationService');

exports.createOrder = (req, res) => {

};

exports.getDronesStatus = (req, res) => {
    return res.json(getDrones());
};

exports.getSimulationRoute = (req, res) => {

};
