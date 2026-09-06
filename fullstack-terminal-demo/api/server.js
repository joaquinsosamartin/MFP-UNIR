const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'demo-api' });
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hola desde una API Node ejecutada desde WSL' });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
