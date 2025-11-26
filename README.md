# Simulador de Entrega por Drone

Uma simulação baseada na web de um sistema de entrega por drones. Gerencie pedidos, visualize rotas de drones e acompanhe entregas em tempo real.

## Funcionalidades
- **Dashboard**: Visualização em tempo real de drones e pedidos em um mapa de grade.
- **Gerenciamento de Pedidos**: Crie pedidos com peso e prioridade específicos.
- **Roteamento Inteligente**: Drones calculam automaticamente a rota mais eficiente (Vizinho Mais Próximo) e retornam à base.
- **Rastreamento de Status**: Quadro estilo Kanban para acompanhar o status do pedido (Pendente, A Caminho, Entregue).
- **Simulação**: Consumo de bateria realista e física de movimento.

## Tecnologias Utilizadas

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces de usuário. Utilizado para gerenciamento de estado da simulação e renderização eficiente dos componentes.
- **Styled Components**: Biblioteca para estilização CSS-in-JS. Utilizado para criar componentes estilizados com escopo definido, facilitando a manutenção e evitando conflitos de classes.
- **Axios**: Cliente HTTP baseado em Promises. Utilizado para realizar requisições à API do backend de forma simples e intuitiva.

### Backend
- **Node.js**: Ambiente de execução JavaScript server-side. Permite utilizar a mesma linguagem no frontend e backend, unificando o desenvolvimento.
- **Express**: Framework web rápido e minimalista para Node.js. Utilizado para criar a API RESTful que gerencia pedidos, drones e rotas.
- **Jest**: Framework de testes em JavaScript. Utilizado para garantir a qualidade e corretude da lógica de negócios e cálculo de rotas.

## Pré-requisitos
- Node.js (v14 ou superior)
- npm (Gerenciador de Pacotes do Node)

## Instalação

1.  **Clone o repositório** (se aplicável) ou navegue até a pasta do projeto.

2.  **Instale as Dependências**:
    Na raiz do projeto, execute:
    ```bash
    npm install
    ```
    Isso instalará as dependências tanto do backend quanto do frontend (usando workspaces).

## Executando a Aplicação

Você pode iniciar ambos os serviços a partir da raiz:

1.  **Inicie Tudo**:
    ```bash
    npm start
    ```
    - O backend rodará em `http://localhost:4000`.
    - O frontend rodará em `http://localhost:3000`.

2.  **Abra no Navegador**:
    Navegue até `http://localhost:3000` para visualizar a aplicação.

## Desenvolvimento

- **Formatar Código**:
    ```bash
    npm run format
    ```

- **Executar Testes**:
    ```bash
    npm test
    ```

## Documentação Detalhada

Veja [DOCUMENTATION.md](./DOCUMENTATION.md) para detalhes sobre a arquitetura, API e modelos.
