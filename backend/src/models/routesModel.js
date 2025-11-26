const routes = [];

module.exports = {
    saveRoute: (route) => {
        routes.push(route);
        return route;
    },

    getLatestRoute: () => {
        return routes[routes.length - 1];
    },

    getAllRoutes: () => {
        return routes;
    },

    clearRoutes: () => {
        routes.length = 0;
    }
};
