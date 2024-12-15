const express = require('express');
const { errorHandlers } = require('./middleware');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.errorHandler);

module.exports = app;

// httpClient.post('', body) => express.json() => req.query
// (req,res,next) - mw, ctrl
// (err,req,res,next) - errorsHandler
