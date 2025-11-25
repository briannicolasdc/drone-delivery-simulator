const { v4: uuidv4 } = require('uuid');
const orders = [];

function addOrder({ x, y, peso, prioridade }) {
    const order = {
        id: uuidv4(),
        x,
        y,
        peso,
        prioridade,
        entregue: false
    };
    orders.push(order);
    return order;
}

function getOrders() {
    return orders;
}

module.exports = { addOrder, getOrders };
