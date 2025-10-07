require('dotenv').config();

async function testConnection() {
  const mysql = require('mysql2/promise');

  // Try multiple host options
  const hostOptions = [process.env.DB_HOST, 'localhost'];

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'Bng20071962!',
    database: process.env.DB_NAME || 'FormMaker',
    connectTimeout: 10000,
  };

  console.log('🔍 Testing MySQL connection...\n');

  for (const host of hostOptions) {
    if (!host) continue;

    const testConfig = { ...config, host };
    console.log(`Trying host: ${host}...`);

    try {
      const connection = await mysql.createConnection(testConfig);
      console.log(`✅ SUCCESS with host: ${host}`);

      // FIXED: Use backticks for reserved keywords or use a different column name
      const [rows] = await connection.execute('SELECT * from canvas');
      console.log(`📅 Database time: ${rows[0].current_time}`);

      // Test if we can access the database
      const [dbs] = await connection.execute('SHOW DATABASES');
      console.log(`📊 Found ${dbs.length} databases`);

      // Check if our target database exists
      const targetDb = config.database;
      const dbExists = dbs.some((db) => db.Database === targetDb);
      console.log(
        `📁 Database "${targetDb}" exists: ${dbExists ? '✅ YES' : '❌ NO'}`
      );

      await connection.end();
      return true;
    } catch (error) {
      console.log(`❌ Failed with ${host}: ${error.message}`);
    }
  }

  console.log('\n💡 All connection attempts failed. Troubleshooting:');
  console.log('1. Make sure XAMPP MySQL is running');
  console.log('2. Check if MySQL is listening on port 3306:');
  console.log('   Run: lsof -i :3306');
  console.log('3. Try connecting from terminal:');
  console.log('   /Applications/XAMPP/bin/mysql -u root -p');

  return false;
}

testConnection();
