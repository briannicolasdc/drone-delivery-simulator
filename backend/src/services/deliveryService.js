const { randomUUID } = require('crypto');
const orders = [];

function addOrder({ x, y, peso, prioridade }) {
  const order = {
    id: randomUUID(),
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

function markAsDelivered(id) {
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.entregue = true;
    return order;
  }
  return null;
}

module.exports = { addOrder, getOrders, markAsDelivered };
