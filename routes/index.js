const cors = require('cors');
const NetSuite = require('../controllers');

module.exports = app => {
  app.post('/lead/create', NetSuite.createWholesaleLead);
}