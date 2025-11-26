const http = require('http');

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function test() {
    try {
        console.log('Creating order...');
        const createOpts = {
            hostname: 'localhost',
            port: 4000,
            path: '/api/pedidos',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        const orderRes = await request(createOpts, { x: 10, y: 10, peso: 5, prioridade: 'alta' });
        console.log('Order created:', orderRes.data);

        console.log('Fetching orders...');
        const getOpts = {
            hostname: 'localhost',
            port: 4000,
            path: '/api/pedidos',
            method: 'GET'
        };
        const ordersRes = await request(getOpts);
        console.log('Orders fetched:', ordersRes.data);

        if (Array.isArray(ordersRes.data) && ordersRes.data.find(o => o.id === orderRes.data.id)) {
            console.log('SUCCESS: Order found in list.');
        } else {
            console.error('FAILURE: Order NOT found in list.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

test();
