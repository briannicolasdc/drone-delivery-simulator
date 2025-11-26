const axios = require('axios');

const API_URL = 'http://localhost:4000/api';

async function test() {
    try {
        console.log('Creating order...');
        const order = await axios.post(`${API_URL}/pedidos`, {
            x: 10,
            y: 10,
            peso: 5,
            prioridade: 'alta'
        });
        console.log('Order created:', order.data);

        console.log('Fetching orders...');
        const orders = await axios.get(`${API_URL}/pedidos`);
        console.log('Orders fetched:', orders.data);

        if (orders.data.find(o => o.id === order.data.id)) {
            console.log('SUCCESS: Order found in list.');
        } else {
            console.error('FAILURE: Order NOT found in list.');
        }

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

test();
