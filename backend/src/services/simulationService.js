const { getDrones } = require('./droneService');
const { getOrders } = require('./deliveryService');
const routesModel = require('../models/routesModel');

function computeRoute() {
    const orders = getOrders().filter((o) => !o.entregue);

    const priorityMap = { alta: 3, media: 2, baixa: 1 };

    orders.sort((a, b) => {
        const pA = priorityMap[a.prioridade] || 0;
        const pB = priorityMap[b.prioridade] || 0;

        if (pA !== pB) {
            return pB - pA;
        }

        const distA = Math.sqrt(a.x * a.x + a.y * a.y);
        const distB = Math.sqrt(b.x * b.x + b.y * b.y);

        return distA - distB;
    });

    const drones = getDrones();
    const assignedOrderIds = new Set();

    const SPEED = 0.02; // Must match frontend speed for accurate time est.

    const assignments = drones.map((drone) => {
        const capacity = drone.capacidade;
        let assigned = [];

        // 1. Greedy Assignment (Bin Packing)
        // We iterate through available orders and fill the drone
        let used = 0;
        for (const o of orders) {
            if (assignedOrderIds.has(o.id)) continue;

            if (used + o.peso <= capacity) {
                assigned.push(o);
                used += o.peso;
                assignedOrderIds.add(o.id);
            }
        }

        // 2. Route Optimization (Nearest Neighbor)
        // Start at base (0,0)
        let currentX = 0;
        let currentY = 0;
        let unvisited = [...assigned];
        const optimizedRoute = [];
        let totalDistance = 0;

        while (unvisited.length > 0) {
            // Find nearest
            let nearestIndex = -1;
            let minDist = Infinity;

            for (let i = 0; i < unvisited.length; i++) {
                const o = unvisited[i];
                const d = Math.sqrt(
                    Math.pow(o.x - currentX, 2) + Math.pow(o.y - currentY, 2)
                );
                if (d < minDist) {
                    minDist = d;
                    nearestIndex = i;
                }
            }

            // Move to nearest
            const nextOrder = unvisited[nearestIndex];
            optimizedRoute.push(nextOrder);
            totalDistance += minDist;
            currentX = nextOrder.x;
            currentY = nextOrder.y;

            // Remove from unvisited
            unvisited.splice(nearestIndex, 1);
        }

        // 3. Return to Base
        if (optimizedRoute.length > 0) {
            const distToBase = Math.sqrt(
                Math.pow(0 - currentX, 2) + Math.pow(0 - currentY, 2)
            );
            totalDistance += distToBase;
        }

        const estimatedTime = totalDistance / SPEED;

        return {
            droneId: drone.id,
            alcance: drone.alcance,
            route: optimizedRoute,
            cargaAtual: used,
            totalDistance: totalDistance.toFixed(2),
            estimatedTime: Math.ceil(estimatedTime)
        };
    });

    const totalMissionTime = Math.max(
        ...assignments.map((a) => a.estimatedTime),
        0
    );

    const result = {
        assignments,
        pendingOrders: orders.filter((o) => !assignedOrderIds.has(o.id)),
        totalMissionTime
    };

    routesModel.saveRoute(result);

    return result;
}

module.exports = { computeRoute };
