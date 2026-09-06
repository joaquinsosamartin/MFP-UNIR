const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Node API funcionando dentro de Docker');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'node-api' });
});

app.listen(port, () => {
  console.log(`Node API escuchando en el puerto ${port}`);
});