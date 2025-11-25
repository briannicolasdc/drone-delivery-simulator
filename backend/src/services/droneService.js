const drones = [
    { id: 1, capacidade: 5, alcance: 20, bateria: 100, x: 0, y: 0 },
    { id: 2, capacidade: 8, alcance: 20, bateria: 100, x: 0, y: 0 },
    { id: 3, capacidade: 5, alcance: 20, bateria: 100, x: 0, y: 0 }
];

function getDrones() {
    return drones;
}

module.exports = { getDrones };
