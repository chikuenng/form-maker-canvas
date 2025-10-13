/**
 * Debug script to check Canvas table data
 * Run this to see what's in your database
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

async function debugCanvasData() {
  let connection;

  try {
    console.log('🔍 Connecting to database...');
    console.log(
      'DATABASE_URL:',
      process.env.DATABASE_URL ? 'Present' : 'Missing'
    );

    connection = await mysql.createConnection(process.env.DATABASE_URL);

    console.log('✅ Connected to database\n');

    // Check Users table
    console.log('=== USERS TABLE ===');
    const [users] = await connection.query(
      'SELECT id, username, email, created_at FROM Users'
    );
    console.table(users);

    if (users.length === 0) {
      console.log('⚠️  No users found! You need to create a user first.');
    }

    // Check Canvas table structure
    console.log('\n=== CANVAS TABLE STRUCTURE ===');
    const [columns] = await connection.query('DESCRIBE Canvas');
    console.table(columns);

    // Check if user_id column exists
    const hasUserId = columns.some((col) => col.Field === 'user_id');
    if (!hasUserId) {
      console.log('❌ ERROR: Canvas table is missing user_id column!');
      console.log('   Run the FIX_CANVAS_USER_ID.sql script in Railway');
      return;
    }

    // Check Canvas table data
    console.log('\n=== CANVAS TABLE DATA ===');
    const [canvasItems] = await connection.query(`
      SELECT c.id, c.Name, c.Type, c.Width, c.Height, c.user_id, u.username 
      FROM Canvas c 
      LEFT JOIN Users u ON c.user_id = u.id
      ORDER BY c.id
    `);

    if (canvasItems.length === 0) {
      console.log('⚠️  No canvas items found!');
      console.log('   Creating sample data...\n');

      // Get first user ID
      const firstUser = users[0];
      if (!firstUser) {
        console.log('❌ Cannot create sample data - no users exist');
        return;
      }

      // Create sample canvas items
      await connection.query(
        `
        INSERT INTO Canvas (Name, Type, Width, Height, user_id) VALUES
        ('Sample Form', 'form', 400, 300, ?),
        ('Text Input', 'input', 200, 40, ?),
        ('Submit Button', 'button', 100, 50, ?)
      `,
        [firstUser.id, firstUser.id, firstUser.id]
      );

      console.log('✅ Created 3 sample canvas items');

      // Fetch again
      const [newItems] = await connection.query(`
        SELECT c.id, c.Name, c.Type, c.Width, c.Height, c.user_id, u.username 
        FROM Canvas c 
        LEFT JOIN Users u ON c.user_id = u.id
        ORDER BY c.id
      `);
      console.table(newItems);
    } else {
      console.table(canvasItems);

      // Check for items with NULL user_id
      const itemsWithoutUser = canvasItems.filter((item) => !item.user_id);
      if (itemsWithoutUser.length > 0) {
        console.log(
          `\n⚠️  Found ${itemsWithoutUser.length} canvas items without user_id!`
        );
        console.log('   Assigning them to first user...');

        const firstUser = users[0];
        await connection.query(
          'UPDATE Canvas SET user_id = ? WHERE user_id IS NULL',
          [firstUser.id]
        );
        console.log('✅ Updated canvas items with user_id');
      }
    }

    // Check Canvas items per user
    console.log('\n=== CANVAS ITEMS PER USER ===');
    const [itemsPerUser] = await connection.query(`
      SELECT u.id, u.username, COUNT(c.id) as canvas_count
      FROM Users u
      LEFT JOIN Canvas c ON u.id = c.user_id
      GROUP BY u.id, u.username
    `);
    console.table(itemsPerUser);

    console.log('\n✅ Debug complete!');
    console.log('\n📋 SUMMARY:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Canvas items: ${canvasItems.length}`);
    console.log(`   - user_id column exists: ${hasUserId ? 'Yes' : 'No'}`);
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure DATABASE_URL is set in your .env file');
    console.error('2. Make sure you can connect to Railway database');
    console.error('3. Run: npm install mysql2');
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the debug
debugCanvasData();
