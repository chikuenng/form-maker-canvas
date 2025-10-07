require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/connection');

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(express.json());

// Test database connection on startup
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await testConnection();
});

// Example route using database
app.get('/users', async (req, res) => {
  try {
    const { pool } = require('./config/connection');
    const [rows] = await pool.query('SELECT * FROM users LIMIT 10');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
