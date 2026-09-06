const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'fullstack-automation-api'
  });
});

app.get('/api/message', (req, res) => {
  res.json({
    message: 'Hola desde la API Node.js'
  });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});