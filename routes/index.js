const cors = require('cors');
const NetSuite = require('../controllers');

module.exports = app => {
  // verification
  const whitelist = [
    'https://suavecito-wholesale.myshopify.com',
    'https://wholesale.suavecitopomade.com',
    'https://suavecito.myshopify.com',
    'https://suavecito.com',
    'https://www.suavecito.com',
    'https://www.wholesale.suavecitopomade.com',
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      console.log('ORIGIN ====>');
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Error: Not allowed by CORS'))
      }
    }
  }

  app.post('/lead/create', cors(corsOptions), NetSuite.createWholesaleLead);
}