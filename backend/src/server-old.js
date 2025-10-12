const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { pool } = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());

// CORS configuration - more permissive for Railway deployment
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
      ? [process.env.FRONTEND_URL]
      : ['*'] // Allow all in production if FRONTEND_URL not set
    : ['http://localhost:3000', 'http://frontend:3000'];

app.use(
  cors({
    origin:
      allowedOrigins[0] === '*'
        ? '*'
        : (origin, callback) => {
            // Allow requests with no origin (mobile apps, Postman, curl)
            if (!origin) return callback(null, true);
            if (
              allowedOrigins.indexOf(origin) !== -1 ||
              allowedOrigins[0] === '*'
            ) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
    credentials: allowedOrigins[0] !== '*',
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

// Test database connection before starting server
async function startServer() {
  try {
    // Test database connection
    console.log('🔍 Testing database connection...');
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');

    // Test if Canvas table exists
    await connection.query('SELECT 1 FROM Canvas LIMIT 1');
    console.log('✅ Canvas table accessible');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('📌 Check your environment variables:');
    console.error('   - DB_HOST:', process.env.DB_HOST || 'NOT SET');
    console.error('   - DB_PORT:', process.env.DB_PORT || 'NOT SET');
    console.error('   - DB_USER:', process.env.DB_USER || 'NOT SET');
    console.error('   - DB_NAME:', process.env.DB_NAME || 'NOT SET');
    console.error('⚠️  Server will start but database operations will fail');
  }

  // Start server
  app.listen(PORT, '0.0.0.0', () => {
    console.log('\n🚀 ====================================');
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🎨 Canvas API: http://localhost:${PORT}/api/canvas`);
    console.log('🚀 ====================================\n');
  });
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();
