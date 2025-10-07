/*
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'Bng20071962!',
    database: process.env.DB_NAME || 'FormMaker',
  };

  console.log('Testing connection with:', {
    host: config.host,
    port: config.port,
    user: config.user,
    database: config.database,
  });

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ SUCCESS: Connected to MySQL database!');

    // Test query
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('✅ Query test passed:', rows);

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ FAILED:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure XAMPP MySQL is running');
    console.log('2. Check DB_USER and DB_PASSWORD in .env file');
    console.log('3. Verify database exists');
    console.log('4. Try connecting with mysql command line tool');
    process.exit(1);
  }
}

testConnection();
*/

// test-db.js
require('dotenv').config();

console.log('=== Testing Database Connection ===');

// Test if we can load mysql2 first
try {
  //const mysql = require('mysql2/promise');
  console.log('✅ MySQL2 loaded successfully');
} catch (error) {
  console.log('❌ Cannot load mysql2:', error.message);
  console.log('💡 Run: npm install mysql2');
  process.exit(1);
}

async function testConnection() {
  const mysql = require('mysql2/promise');

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'Bng20071962!',
    database: process.env.DB_NAME || 'FormMaker',
  };

  console.log('\nTrying to connect with:');
  console.log('- Host:', config.host);
  console.log('- Port:', config.port);
  console.log('- User:', config.user);
  console.log('- Database:', config.database);
  console.log('- Password:', config.password ? '***hidden***' : 'empty');

  try {
    const connection = await mysql.createConnection(config);
    console.log('\n✅ SUCCESS: Connected to MySQL database!');

    //Test a simple query
    const [rows] = await connection.execute('SELECT * FROM `Canvas`');
    console.log('✅ Query test passed. Current time:', rows[0]);

    await connection.end();
    return true;
  } catch (error) {
    console.log('\n❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure XAMPP MySQL is running');
    console.log('2. Check your .env file credentials');
    console.log('3. Try: /Applications/XAMPP/bin/mysql -u root -p');
    return false;
  }
}

testConnection();
