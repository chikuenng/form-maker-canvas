require('dotenv').config();

async function testConnection() {
  const mysql = require('mysql2/promise');

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'Bng20071962!',
    database: process.env.DB_NAME || 'FormMaker',
  };

  console.log('Testing database connection...');
  console.log('Config:', {
    ...config,
    password: config.password ? 'Bng20071962!' : 'empty',
  });

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Database connected successfully!');

    // Simple query that always works
    const [result] = await connection.execute('SELECT 1 + 1 as sum');
    console.log('✅ Basic query test:', result[0].sum);

    // Get database version
    const [version] = await connection.execute('SELECT VERSION() as version');
    console.log('✅ Database version:', version[0].version);

    await connection.end();
    console.log('🎉 All tests passed! Your database connection is working.');
    return true;
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return false;
  }
}

testConnection();
