const { addOrder, getOrders, markAsDelivered } = require('../src/services/deliveryService');

describe('Delivery Service', () => {
    test('should add an order correctly', () => {
        const order = addOrder({ x: 10, y: 20, peso: 5, prioridade: 'alta' });
        expect(order).toHaveProperty('id');
        expect(order.x).toBe(10);
        expect(order.entregue).toBe(false);
    });

    test('should retrieve all orders', () => {
        const orders = getOrders();
        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBeGreaterThan(0);
    });

    test('should mark order as delivered', () => {
        const order = addOrder({ x: 5, y: 5, peso: 2 });
        const updated = markAsDelivered(order.id);
        expect(updated.entregue).toBe(true);
    });
});
