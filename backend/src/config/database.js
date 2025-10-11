require('dotenv').config();

// Support both Railway's MYSQL_URL and individual environment variables
let dbConfig;

if (process.env.MYSQL_URL) {
  // Parse Railway's MYSQL_URL format: mysql://user:pass@host:port/database
  const url = new URL(process.env.MYSQL_URL);

  dbConfig = {
    host: url.hostname,
    port: url.port || 3306,
    user: url.username,
    password: url.password,
    database: process.env.DB_NAME || url.pathname.substring(1) || 'FormMaker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  console.log('📡 Using MYSQL_URL for database connection');
} else {
  // Fallback to individual environment variables
  dbConfig = {
    host: process.env.DB_HOST || 'mysql.railway.internal',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'FnOdwTeILKVqdemLIEmEmUKrGGfKWvUP',
    database: process.env.DB_NAME || 'FormMaker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  console.log('📡 Using individual DB_* environment variables');
}

module.exports = dbConfig;
