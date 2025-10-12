const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  console.log('🔗 Connecting to Railway MySQL database...');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('✅ Connected to database');

    // Create Canvas table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Canvas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Type VARCHAR(100) NOT NULL,
        Width INT NOT NULL DEFAULT 100,
        Height INT NOT NULL DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Canvas table created');

    // Insert sample data
    await connection.execute(`
      INSERT IGNORE INTO Canvas (Name, Type, Width, Height) VALUES
      ('Sample Form', 'form', 400, 300),
      ('Text Input', 'input', 200, 40),
      ('Submit Button', 'button', 100, 50),
      ('Checkbox Group', 'checkbox', 150, 120),
      ('Radio Group', 'radio', 150, 100)
    `);
    console.log('✅ Sample data inserted');

    // Create Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create Forms table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Forms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        canvas_data JSON,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Forms table created');

    // Create FormElements table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS FormElements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        form_id INT NOT NULL,
        element_type VARCHAR(50) NOT NULL,
        element_data JSON NOT NULL,
        position_x INT DEFAULT 0,
        position_y INT DEFAULT 0,
        width INT DEFAULT 100,
        height INT DEFAULT 40,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (form_id) REFERENCES Forms(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ FormElements table created');

    console.log('🎉 Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await connection.end();
  }
}

setupDatabase();
