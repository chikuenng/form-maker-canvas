-- Railway Database Initialization Script
-- Run this script after provisioning MySQL in Railway

-- Create database if it doesn't exist
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

-- Create Users table (if needed)
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data for testing (optional)
INSERT INTO Canvas (Name, Type, Width, Height) VALUES 
  ('Sample Form', 'form', 400, 300),
  ('Test Canvas', 'canvas', 800, 600)
ON DUPLICATE KEY UPDATE Name=Name;

-- Verify tables were created
SHOW TABLES;

-- Show Canvas table structure
DESCRIBE Canvas;

SELECT 'Database initialization complete!' AS Status;

