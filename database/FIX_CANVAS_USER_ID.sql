-- ============================================
-- FIX: Add user_id to Canvas table
-- ============================================
-- Instructions:
-- 1. Go to your Railway project
-- 2. Click on your MySQL database service
-- 3. Go to "Query" tab
-- 4. Copy and paste this entire script
-- 5. Click "Run" or press Ctrl+Enter
-- ============================================

USE FormMaker;

-- Step 1: Add user_id column to Canvas (MySQL will ignore if exists)
ALTER TABLE Canvas ADD COLUMN user_id INT;

-- Step 2: Get the first user ID
SET @userId = (SELECT id FROM Users ORDER BY id ASC LIMIT 1);

-- Step 3: Update all Canvas items to belong to the first user
UPDATE Canvas 
SET user_id = @userId 
WHERE user_id IS NULL;

-- Step 4: Add foreign key
ALTER TABLE Canvas 
ADD CONSTRAINT Canvas_ibfk_1 
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE;

-- Step 5: Add index for better performance
CREATE INDEX idx_canvas_user_id ON Canvas(user_id);

-- Step 6: Verify the fix
SELECT '✓ FIX COMPLETE' AS Status;

SELECT '--- Canvas Table Structure ---' AS '';
DESCRIBE Canvas;

SELECT '--- Canvas Records ---' AS '';
SELECT c.id, c.Name, c.Type, c.Width, c.Height, c.user_id, u.username 
FROM Canvas c 
LEFT JOIN Users u ON c.user_id = u.id
ORDER BY c.id;

SELECT '--- Users ---' AS '';
SELECT id, username, email, created_at FROM Users;

