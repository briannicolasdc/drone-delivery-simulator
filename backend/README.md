# Backend - Drone Delivery Simulator

Servidor API REST construído com Node.js e Express.

## Funcionalidades
- API RESTful para gerenciamento de pedidos e drones.
- Algoritmo de roteamento (Vizinho Mais Próximo + Bin Packing).
- Persistência de dados em memória.

## Scripts
- `npm start`: Inicia o servidor em modo de produção.
- `npm run dev`: Inicia o servidor com hot-reload (nodemon).
- `npm test`: Executa testes unitários com Jest.
- `npm run format`: Formata o código com Prettier.

## Estrutura
- `server.js`: Ponto de entrada da aplicação.
- `src/`: Código fonte.
    - `controllers/`: Lógica de controle de requisições.
    - `models/`: Modelos de dados.
    - `routes/`: Definições de rotas.
    - `services/`: Lógica de negócios.
