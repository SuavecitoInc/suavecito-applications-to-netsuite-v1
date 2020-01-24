'use strict'
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');

app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Might not need all this
app.use(express.json());

// route & controller
routes(app);

module.exports = app;