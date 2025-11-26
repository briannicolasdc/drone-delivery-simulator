const http = require('http');

function createOrder(order) {
    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 4000,
            path: '/api/pedidos',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });
        req.on('error', reject);
        req.write(JSON.stringify(order));
        req.end();
    });
}

async function runLoadTest() {
    console.log('Starting Load Test...');
    const TOTAL_ORDERS = 50;
    let success = 0;
    let failed = 0;

    const startTime = Date.now();

    const promises = [];
    for (let i = 0; i < TOTAL_ORDERS; i++) {
        const order = {
            x: Math.floor(Math.random() * 40) - 20,
            y: Math.floor(Math.random() * 40) - 20,
            peso: Math.floor(Math.random() * 5) + 1, // 1-6kg
            prioridade: Math.random() > 0.7 ? 'alta' : 'media'
        };
        promises.push(createOrder(order));
    }

    const results = await Promise.all(promises);

    results.forEach(r => {
        if (r.status === 201) success++;
        else {
            failed++;
            console.log('Failed:', r.body);
        }
    });

    const duration = (Date.now() - startTime) / 1000;
    console.log(`\nLoad Test Completed in ${duration}s`);
    console.log(`Total Orders: ${TOTAL_ORDERS}`);
    console.log(`Success: ${success}`);
    console.log(`Failed: ${failed}`);
}

runLoadTest();
