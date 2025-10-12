# 🚀 Simple Database Setup Guide

Follow these steps to initialize your Railway MySQL database.

---

## Step 1: Get Your MySQL Connection URL

1. Go to **Railway Dashboard**
2. Click on your **MySQL service** (not the backend)
3. Click on **"Variables"** tab
4. Look for a variable called **`MYSQL_URL`** or **`DATABASE_URL`**
5. It will look something like this:
   ```
   mysql://root:PASSWORD@viaduct.proxy.rlwy.net:12345/railway
   ```
6. **Copy this entire URL**

---

## Step 2: Choose Your Method

### 🟢 METHOD A: Railway CLI (If you're comfortable with terminal)

**In a NEW terminal window** (not in Cursor), run these commands:

```bash
# Login to Railway (opens browser)
railway login

# Go to your project directory
cd "/Users/chikuenng/Cursor/Form Maker - Canvas"

# Link to your project
railway link

# Connect to MySQL (this will open a MySQL shell)
railway connect MySQL
```

Once connected, **paste the contents** of `database/COPY_THIS_SQL.sql`

---

### 🟢 METHOD B: Use MySQL Command Line

If you have MySQL installed locally:

```bash
# Replace YOUR_CONNECTION_URL with the URL from Step 1
mysql YOUR_CONNECTION_URL < database/COPY_THIS_SQL.sql
```

Example:

```bash
mysql "mysql://root:abc123@viaduct.proxy.rlwy.net:12345/railway" < database/COPY_THIS_SQL.sql
```

---

### 🟢 METHOD C: Use a Database Tool (Easiest!)

**Option 1: TablePlus (Recommended)**

1. Download TablePlus: https://tableplus.com/
2. Open TablePlus → Click "Create a new connection"
3. Select "MySQL"
4. Paste your connection URL in the "Connection URL" field
5. Click "Test" then "Connect"
6. Open `database/COPY_THIS_SQL.sql` file
7. Copy all the SQL
8. Paste into TablePlus query window
9. Click "Run" (⌘+Enter)

**Option 2: DBeaver (Free)**

1. Download: https://dbeaver.io/download/
2. Similar process to TablePlus

**Option 3: MySQL Workbench**

1. Download: https://dev.mysql.com/downloads/workbench/
2. Connect using URL from Railway

---

## Step 3: Verify It Worked

After running the SQL, you should see:

- ✅ "Database initialized successfully!"
- ✅ Table showing 3 canvas items
- ✅ Table structure displayed

---

## Step 4: Verify Environment Variables

Make sure your **backend service** in Railway has these variables:

```
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_USER=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
DB_NAME=FormMaker
NODE_ENV=production
```

**IMPORTANT:** Notice `DB_NAME=FormMaker` (not "railway")

---

## Step 5: Redeploy Backend

After database is initialized:

1. Railway Dashboard → Your **Backend Service**
2. Click "Deployments" tab
3. Click "Redeploy" button
4. Wait 1-2 minutes
5. Check logs - should show:
   ```
   ✅ Database connected successfully
   ✅ Canvas table accessible
   ```

---

## 🆘 Stuck? Quick Troubleshooting

### Can't find MYSQL_URL?

- Look for `DATABASE_URL` instead
- Or manually construct it from individual variables:
  ```
  mysql://[MYSQL_USER]:[MYSQL_PASSWORD]@[MYSQL_HOST]:[MYSQL_PORT]/railway
  ```

### Railway CLI says "not linked"?

- Run: `railway link`
- Select your project from the list

### MySQL command not found?

- You need to install MySQL client or use a GUI tool (TablePlus recommended)

### Still seeing "Database connection failed"?

- Double-check environment variables in backend service
- Make sure `DB_NAME=FormMaker` (not "railway")
- Make sure you ran the SQL to create FormMaker database

---

## ✨ What's Next?

Once database is initialized and backend is redeployed:

1. Get your Railway backend URL
2. Test it:

   ```bash
   curl https://your-app.railway.app/health
   curl https://your-app.railway.app/api/canvas
   ```

3. You should see JSON responses! 🎉
