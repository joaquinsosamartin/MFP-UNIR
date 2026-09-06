const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', async (req, res) => {
  res.json({ status: 'OK', service: 'api' });
});

app.get('/db-check', async (req, res) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const [rows] = await connection.execute('SELECT 1 AS result');
  await connection.end();
  res.json({ database: 'OK', rows });
});

app.listen(port, () => console.log(`API running on port ${port}`));
