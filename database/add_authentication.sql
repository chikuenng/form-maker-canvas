-- ============================================
-- Add Authentication to FormMaker Database
-- ============================================

USE FormMaker;

-- Update Users table with authentication fields
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add user_id to Canvas table
ALTER TABLE Canvas 
ADD COLUMN user_id INT,
ADD FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE;

-- Create index for faster queries
CREATE INDEX idx_canvas_user_id ON Canvas(user_id);

-- Create a test user (password: "password123")
-- Password hash generated with bcrypt
INSERT INTO Users (username, email, password_hash) VALUES 
('testuser', 'test@example.com', '$2b$10$rRJKeYoVVV5yYKLF.6YXXu3qK8aP7E0qSz9kxLh.jcP4FqQC8kHqy');

-- Update existing Canvas items to belong to test user
UPDATE Canvas SET user_id = 1 WHERE user_id IS NULL;

SELECT 'Authentication schema created successfully!' AS Status;
SELECT * FROM Users;

