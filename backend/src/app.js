const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'https://myparent-stage-3by24ilen-arpimukhs-projects.vercel.app',
 credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
module.exports = app;