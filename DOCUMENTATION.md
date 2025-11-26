# Documentação do Sistema

## Visão Geral
O Simulador de Entrega por Drone é uma aplicação full-stack projetada para simular e visualizar operações de entrega autônoma. O sistema consiste em um backend Node.js para lógica e um frontend React para visualização.

## Arquitetura
A aplicação segue uma arquitetura cliente-servidor padrão:

- **Frontend (React.js)**: Responsável pela interface do usuário, visualização do mapa e interação com o usuário. Comunica-se com o backend via API REST.
- **Backend (Node.js/Express)**: Responsável pela lógica de negócios, gerenciamento de estado (pedidos, drones), cálculo de rotas e persistência de dados em memória.

---

## Backend

### Estrutura de Diretórios
- `src/controllers`: Controladores para lidar com requisições HTTP.
- `src/models`: Modelos de dados (em memória) para Drones, Pedidos e Rotas.
- `src/routes`: Definições das rotas da API.
- `src/services`: Lógica de negócios (cálculo de rotas, gerenciamento de drones).

### Modelos de Dados
- **Drones**: Armazena ID, capacidade, velocidade e posição atual.
- **Pedidos**: Armazena ID, coordenadas de destino, peso, prioridade e status de entrega.
- **Rotas**: Armazena o histórico de rotas calculadas e atribuições de drones.

### API REST

#### Pedidos
- `GET /api/pedidos`: Lista todos os pedidos.
- `POST /api/pedidos`: Cria um novo pedido.
- `POST /api/pedidos/:id/entregar`: Marca um pedido como entregue.

#### Simulação
- `GET /api/simulacoes/rota`: Calcula e retorna rotas otimizadas.
- `GET /api/drones/status`: Retorna o status atual dos drones.

### Algoritmo de Roteamento
1.  **Atribuição (Bin Packing)**: Pedidos são agrupados para preencher a capacidade dos drones, priorizando pedidos urgentes.
2.  **Roteamento (Vizinho Mais Próximo)**: O drone visita o ponto mais próximo a cada passo.
3.  **Retorno à Base**: O drone sempre retorna à base (0,0) ao final da rota.

---

## Frontend

### Estrutura de Diretórios
- `src/components`: Componentes reutilizáveis (Header, Mapa, Painel de Status).
- `src/pages`: Páginas da aplicação (Dashboard, Pedidos, Status).
- `src/context`: Contexto React para gerenciamento de estado global da simulação.
- `src/services`: Camada de serviço para comunicação com a API.
- `src/styles`: Estilos globais e configurações de Styled Components.

### Componentes Principais
- **SimulationMap**: Renderiza o grid, drones, pedidos e base usando Styled Components.
- **StatusPanel**: Exibe informações detalhadas sobre drones e a legenda do mapa.
- **OrdersPage**: Formulário para criação de novos pedidos.
- **DashboardPage**: Visão geral da simulação com mapa e lista de atribuições.

### Tecnologias
- **React**: Biblioteca principal de UI.
- **Styled Components**: Para estilização modular e dinâmica.
- **Axios**: Para requisições HTTP.
- **React Router**: Para navegação entre páginas.
