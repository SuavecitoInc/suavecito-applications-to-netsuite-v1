const NetSuite = require('../controllers');

module.exports = app => {
  app.post('/lead/create', NetSuite.createWholesaleLead);
  app.post('/lead/attach', NetSuite.attachFileToRecord);
  app.post('/case/create', NetSuite.createSupportCase);
}