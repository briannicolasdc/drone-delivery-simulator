const { drones } = require('../models/dronesModel');

function getDrones() {
  return drones;
}

module.exports = { getDrones };
