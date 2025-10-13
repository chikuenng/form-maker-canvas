# 🐛 Debug: No Canvas Records Showing

## Step 1: Check Browser Console

1. **Open your deployed frontend** in the browser
2. **Press F12** (or Right-click → Inspect)
3. **Go to Console tab**
4. **Login** and watch for these messages:
   ```
   === FETCHING CANVAS ITEMS ===
   Current user: {id: 1, username: "..."}
   Response status: 200
   Canvas items received: [...]
   ```

### What to look for:

- ❌ **If you see "Authentication failed"** → Token is invalid, try logging in again
- ❌ **If you see "Response status: 500"** → Database error, check Step 2
- ❌ **If you see "Canvas items received: []"** → Empty array, no data in database, check Step 3
- ✅ **If you see "Canvas items received: [{...}]"** → Data exists but not showing, check Step 4

---

## Step 2: Check Database Connection

Run the debug script locally to check your database:

```bash
node debug-canvas-data.js
```

This will:

- ✅ Check if `user_id` column exists in Canvas table
- ✅ Show all users in the database
- ✅ Show all canvas items with their owners
- ✅ Create sample data if none exists
- ✅ Fix any canvas items without user_id

### Expected Output:

```
✅ Connected to database

=== USERS TABLE ===
┌─────────┬─────┬──────────┬────────────────────────┐
│ (index) │ id  │ username │ email                  │
├─────────┼─────┼──────────┼────────────────────────┤
│    0    │  1  │ 'myuser' │ 'myuser@example.com'   │
└─────────┴─────┴──────────┴────────────────────────┘

=== CANVAS TABLE DATA ===
┌─────────┬─────┬─────────────────┬──────────┬───────┬────────┬─────────┬──────────┐
│ (index) │ id  │ Name            │ Type     │ Width │ Height │ user_id │ username │
├─────────┼─────┼─────────────────┼──────────┼───────┼────────┼─────────┼──────────┤
│    0    │  1  │ 'Sample Form'   │ 'form'   │  400  │  300   │    1    │ 'myuser' │
└─────────┴─────┴─────────────────┴──────────┴───────┴────────┴─────────┴──────────┘
```

---

## Step 3: Verify Database Has Data

### Option A: Using Railway Query Tab

1. Go to **Railway Dashboard** → Your MySQL database
2. Click **"Query"** tab
3. Run this query:

   ```sql
   USE FormMaker;

   -- Check Canvas table structure
   DESCRIBE Canvas;

   -- Check all Canvas items
   SELECT c.*, u.username
   FROM Canvas c
   LEFT JOIN Users u ON c.user_id = u.id;

   -- Check Users
   SELECT id, username, email FROM Users;
   ```

### Option B: Create Test Data

If no Canvas records exist, run this in Railway Query tab:

```sql
USE FormMaker;

-- Get first user ID
SET @userId = (SELECT id FROM Users ORDER BY id ASC LIMIT 1);

-- Create test canvas items
INSERT INTO Canvas (Name, Type, Width, Height, user_id) VALUES
('Test Form', 'form', 400, 300, @userId),
('Text Input', 'input', 200, 40, @userId),
('Submit Button', 'button', 100, 50, @userId),
('Checkbox Group', 'checkbox', 150, 120, @userId);

-- Verify
SELECT c.id, c.Name, c.Type, c.user_id, u.username
FROM Canvas c
JOIN Users u ON c.user_id = u.id;
```

---

## Step 4: Check User ID Match

The logged-in user's ID must match the `user_id` in Canvas records.

### In Browser Console (while logged in):

```javascript
// Check current user
const user = JSON.parse(localStorage.getItem('user'));
console.log('Logged in user ID:', user.id);
```

### In Database:

```sql
-- See which users have canvas items
SELECT u.id, u.username, COUNT(c.id) as canvas_count
FROM Users u
LEFT JOIN Canvas c ON u.id = c.user_id
GROUP BY u.id, u.username;
```

**If IDs don't match:**

- Either create canvas items for your user
- Or assign existing items to your user:
  ```sql
  UPDATE Canvas SET user_id = 1 WHERE user_id IS NULL;
  -- Replace 1 with your user's ID
  ```

---

## Step 5: Check Backend Logs (Railway)

1. Go to **Railway Dashboard** → Your backend service
2. Click **"Deployments"** tab
3. Click latest deployment
4. Check logs for errors when you load the page

Look for:

```
Error fetching canvas items: ...
```

---

## Step 6: Test API Directly

Use this curl command (replace TOKEN with your actual token from localStorage):

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     https://web-production-9c4a.up.railway.app/api/canvas
```

**Expected response:**

```json
[
  {
    "id": 1,
    "Name": "Sample Form",
    "Type": "form",
    "Width": 400,
    "Height": 300,
    "user_id": 1
  }
]
```

---

## Common Issues & Fixes

### Issue 1: Empty Array `[]` returned

**Cause:** No Canvas items exist for your user_id
**Fix:** Create test data (see Step 3, Option B)

### Issue 2: `user_id` column doesn't exist

**Cause:** Migration not run
**Fix:** Run `database/FIX_CANVAS_USER_ID.sql` in Railway

### Issue 3: Authentication errors (401/403)

**Cause:** Token expired or invalid
**Fix:** Logout and login again

### Issue 4: CORS errors

**Cause:** Frontend URL not allowed
**Fix:** Check Railway backend environment variables

### Issue 5: Canvas container still hidden

**Cause:** JavaScript not updated
**Fix:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## Quick Test Checklist

- [ ] `user_id` column exists in Canvas table
- [ ] Canvas table has at least one record
- [ ] Canvas records have non-NULL `user_id`
- [ ] User exists in Users table
- [ ] Logged-in user ID matches Canvas `user_id`
- [ ] Browser console shows "Canvas items received: [...]"
- [ ] No authentication errors (401/403)
- [ ] Frontend redeployed with latest changes

---

## Still Not Working?

**Share these details:**

1. Output from `node debug-canvas-data.js`
2. Browser console logs (F12 → Console)
3. Response from curl command
4. Railway backend logs (if any errors)

This will help identify the exact issue!
