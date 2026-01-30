const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'https://myparent-stage.vercel.app',
 credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));
app.options('*', cors({
  origin: 'https://myparent-stage.vercel.app',
 credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));
module.exports = app;