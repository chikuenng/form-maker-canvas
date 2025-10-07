const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { pool } = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['http://localhost:3000']
        : ['http://localhost:3000', 'http://frontend:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Canvas API endpoints
app.get('/api/canvas', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Canvas');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching canvas items:', error);
    res.status(500).json({ error: 'Failed to fetch canvas items' });
  }
});

app.post('/api/canvas', async (req, res) => {
  try {
    const { Name, Type, Width, Height } = req.body;

    if (!Name || !Type || !Width || !Height) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.execute(
      'INSERT INTO Canvas (Name, Type, Width, Height) VALUES (?, ?, ?, ?)',
      [Name, Type, Width, Height]
    );

    res.status(201).json({
      id: result.insertId,
      Name,
      Type,
      Width,
      Height,
    });
  } catch (error) {
    console.error('Error creating canvas item:', error);
    res.status(500).json({ error: 'Failed to create canvas item' });
  }
});

app.put('/api/canvas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Type, Width, Height } = req.body;

    const [result] = await pool.execute(
      'UPDATE Canvas SET Name = ?, Type = ?, Width = ?, Height = ? WHERE id = ?',
      [Name, Type, Width, Height, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Canvas item not found' });
    }

    res.json({ id, Name, Type, Width, Height });
  } catch (error) {
    console.error('Error updating canvas item:', error);
    res.status(500).json({ error: 'Failed to update canvas item' });
  }
});

app.delete('/api/canvas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM Canvas WHERE id = ?', [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Canvas item not found' });
    }

    res.json({ message: 'Canvas item deleted successfully' });
  } catch (error) {
    console.error('Error deleting canvas item:', error);
    res.status(500).json({ error: 'Failed to delete canvas item' });
  }
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🎨 Canvas API: http://localhost:${PORT}/api/canvas`);
});
