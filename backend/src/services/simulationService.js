const { getDrones } = require('./droneService');
const { getOrders } = require('./deliveryService');

function computeRoute() {
    const orders = getOrders().filter(o => !o.entregue);

    const priorityMap = { 'alta': 3, 'media': 2, 'baixa': 1 };

    orders.sort((a, b) => {
        const pA = priorityMap[a.prioridade] || 0;
        const pB = priorityMap[b.prioridade] || 0;

        if (pA !== pB) {
            return pB - pA; // Higher priority first
        }

        const distA = Math.sqrt(a.x * a.x + a.y * a.y);
        const distB = Math.sqrt(b.x * b.x + b.y * b.y);

        return distA - distB; // Closer distance first
    });

    const drones = getDrones();

    return {
        assignments: drones.map(drone => {
            const capacity = drone.capacidade;
            const assigned = [];

            let used = 0;
            for (const o of orders) {
                if (used + o.peso <= capacity) {
                    assigned.push(o);
                    used += o.peso;
                }
            }

            return {
                droneId: drone.id,
                route: assigned,
                cargaAtual: used
            };
        }),
        pendingOrders: []
    };
}

module.exports = { computeRoute };
