#!/bin/bash

# Script to initialize Railway database
# This uses Railway CLI to connect and run the SQL

echo "🔧 Initializing Railway MySQL Database..."
echo "=========================================="
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
    echo ""
fi

echo "📋 This will:"
echo "  1. Connect to your Railway MySQL service"
echo "  2. Create the FormMaker database"
echo "  3. Create the Canvas table"
echo "  4. Insert sample data"
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

echo ""
echo "🔐 Connecting to Railway MySQL..."
echo "You may need to select your project and MySQL service..."
echo ""

# Create SQL file
cat > /tmp/railway-init.sql << 'EOF'
CREATE DATABASE IF NOT EXISTS FormMaker;
USE FormMaker;

CREATE TABLE IF NOT EXISTS Canvas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Type VARCHAR(50) NOT NULL,
  Width INT NOT NULL,
  Height INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Canvas (Name, Type, Width, Height) VALUES 
  ('Sample Form', 'form', 400, 300),
  ('Test Canvas', 'canvas', 800, 600);

SELECT 'Database initialized successfully!' AS Status;
SELECT * FROM Canvas;
EOF

echo "📝 SQL commands prepared"
echo ""
echo "🚀 Running initialization..."
echo ""

railway connect MySQL < /tmp/railway-init.sql

echo ""
echo "✅ Database initialization complete!"
echo ""
echo "🧪 Testing connection from your backend..."
echo "Check your Railway backend deployment logs to verify database connection."

# Cleanup
rm /tmp/railway-init.sql

