-- ============================================
-- Railway Database Initialization
-- ============================================
-- Copy and paste this entire file into your MySQL client
-- (TablePlus, MySQL Workbench, or Railway CLI)

-- Create the FormMaker database
CREATE DATABASE IF NOT EXISTS FormMaker;

-- Use the database
USE FormMaker;

-- Create Canvas table
CREATE TABLE IF NOT EXISTS Canvas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Type VARCHAR(50) NOT NULL,
  Width INT NOT NULL,
  Height INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Users table (optional, for future use)
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT INTO Canvas (Name, Type, Width, Height) VALUES 
  ('Sample Form', 'form', 400, 300),
  ('Test Canvas', 'canvas', 800, 600),
  ('Contact Form', 'form', 350, 400);

-- Verify the setup
SELECT 'Database initialized successfully!' AS Status;
SELECT * FROM Canvas;
SELECT COUNT(*) AS 'Total Canvas Items' FROM Canvas;

-- Show table structure
DESCRIBE Canvas;

