// test-mysql.js
console.log('Testing MySQL2 installation...');

try {
  const mysql = require('mysql2');
  console.log('✅ MySQL2 loaded successfully!');

  // Test the promise version too
  const mysqlPromise = require('mysql2/promise');
  console.log('✅ MySQL2/promise also loaded!');
} catch (error) {
  console.log('❌ Error loading MySQL2:', error.message);
  console.log('Run: npm install mysql2');
}
