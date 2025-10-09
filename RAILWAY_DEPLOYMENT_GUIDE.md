# Railway Deployment Guide

## Current Issue: Getting Railway Front Page Only

This means Railway deployed successfully but your app isn't starting or isn't accessible. Follow these steps to diagnose and fix:

---

## Step 1: Check Railway Deployment Logs

1. Go to your Railway project dashboard
2. Click on your service
3. Click on "Deployments" tab
4. Click on the latest deployment
5. Check the **Build Logs** and **Deploy Logs**

### What to Look For:

- ❌ **Build failures**: Missing dependencies, npm install errors
- ❌ **Start failures**: Application crashes on startup
- ❌ **Port binding errors**: App not listening on correct port
- ❌ **Database connection errors**: Cannot connect to MySQL

---

## Step 2: Verify Environment Variables

Your app needs these environment variables set in Railway:

### Required Variables:

1. In Railway Dashboard → Your Service → Variables tab, add:

```
PORT=${{PORT}}                    # Railway provides this automatically
NODE_ENV=production
DB_HOST=${{MYSQL_HOST}}          # From Railway MySQL plugin
DB_PORT=${{MYSQL_PORT}}          # From Railway MySQL plugin
DB_USER=${{MYSQL_USER}}          # From Railway MySQL plugin
DB_PASSWORD=${{MYSQL_PASSWORD}}  # From Railway MySQL plugin
DB_NAME=FormMaker
```

### Important:

- If you haven't added a MySQL database, you need to add the MySQL plugin in Railway
- The `${{VARIABLE}}` syntax automatically references Railway's provided variables

---

## Step 3: Configure Railway Service

### Option A: Using Railway Dashboard

1. **Set Root Directory** (if deploying from monorepo):
   - Settings → Root Directory → Leave blank (we deploy from root)

2. **Set Start Command**:
   - Settings → Deploy → Start Command → `npm start`

3. **Set Build Command** (optional):
   - Settings → Deploy → Build Command → `npm install`

### Option B: Using railway.json (Already Created)

The `railway.json` file has been created for you with proper configuration.

---

## Step 4: Add MySQL Database

If you haven't already:

1. In Railway Dashboard → Your Project
2. Click "New" → "Database" → "Add MySQL"
3. Wait for it to provision
4. Railway automatically creates connection variables
5. Reference them in your service variables (see Step 2)

---

## Step 5: Update CORS Configuration

Your backend currently only allows `http://localhost:3000`. For production:

**Two Deployment Options:**

### Option 1: Backend Only (API Server)

- Deploy only the backend
- Access it via the Railway URL
- Update CORS to allow your frontend domain

### Option 2: Full Stack (Backend + Frontend)

- Deploy backend as one Railway service
- Deploy frontend as a separate Railway service (static site)
- Update CORS with your frontend Railway URL

---

## Step 6: Fix Application Issues

### Issue 1: Duplicate server files

You have two server files:

- `backend/src/server.js` ✅ (main entry point, complete)
- `backend/src/app.js` ❌ (different implementation)

**Resolution**: Your `package.json` correctly points to `server.js`. Ignore `app.js` or delete it.

### Issue 2: Port binding

Your `server.js` correctly listens on `0.0.0.0`:

```javascript
app.listen(PORT, '0.0.0.0', () => { ... })
```

This is correct for Railway. ✅

### Issue 3: Database connection

Your app uses `mysql2` with connection pooling. Make sure:

- MySQL database is provisioned in Railway
- Environment variables are set correctly
- Database `FormMaker` exists and has the `Canvas` table

---

## Step 7: Test Deployment

After fixing the above:

1. **Redeploy**:
   - Push changes to GitHub
   - Railway auto-deploys

2. **Check Health Endpoint**:

   ```bash
   curl https://your-app.railway.app/health
   ```

   Expected response:

   ```json
   { "status": "OK", "timestamp": "2025-10-09T..." }
   ```

3. **Check API Endpoint**:

   ```bash
   curl https://your-app.railway.app/api/canvas
   ```

4. **Check Logs**:
   - Railway Dashboard → Deployments → View Logs
   - Look for: "🚀 Backend server running on port XXXX"

---

## Step 8: Common Railway Errors and Fixes

### Error: "Application failed to respond"

**Cause**: App crashed or not listening on PORT
**Fix**:

- Check logs for errors
- Ensure `PORT` env variable is used: `process.env.PORT`
- Verify app binds to `0.0.0.0`, not `localhost`

### Error: "Build failed"

**Cause**: Missing dependencies or build command issues
**Fix**:

- Ensure all dependencies are in `package.json`
- Check build logs for specific error
- Try local: `npm install && npm start`

### Error: "Database connection failed"

**Cause**: Wrong credentials or database not provisioned
**Fix**:

- Verify MySQL plugin is added
- Check environment variables match Railway's MySQL variables
- Ensure database `FormMaker` exists

### Error: "502 Bad Gateway"

**Cause**: App crashed after starting
**Fix**:

- Check deploy logs for runtime errors
- Test database connection
- Verify all environment variables are set

---

## Step 9: Initialize Database Schema

Your app expects a `Canvas` table. After MySQL is provisioned:

1. Connect to Railway MySQL:
   - Use Railway's MySQL connection string
   - Use a MySQL client (TablePlus, DBeaver, or mysql CLI)

2. Create the database and table:

   ```sql
   CREATE DATABASE IF NOT EXISTS FormMaker;
   USE FormMaker;

   CREATE TABLE Canvas (
     id INT AUTO_INCREMENT PRIMARY KEY,
     Name VARCHAR(255) NOT NULL,
     Type VARCHAR(50) NOT NULL,
     Width INT NOT NULL,
     Height INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

---

## Quick Checklist

- [ ] MySQL database added in Railway
- [ ] Environment variables configured (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT)
- [ ] Database schema created (FormMaker database, Canvas table)
- [ ] Start command set to `npm start`
- [ ] Build logs show successful npm install
- [ ] Deploy logs show "Backend server running on port..."
- [ ] Health check endpoint responds: `/health`
- [ ] No errors in Railway logs

---

## Debugging Commands

Once deployed, test these endpoints:

```bash
# Replace YOUR_URL with your Railway app URL
export RAILWAY_URL="https://your-app-name.railway.app"

# Test health check
curl $RAILWAY_URL/health

# Test canvas API
curl $RAILWAY_URL/api/canvas

# Test with verbose output
curl -v $RAILWAY_URL/health
```

---

## Next Steps After Backend Works

1. **Deploy Frontend Separately** (Recommended):
   - Create a new Railway service
   - Deploy from `/frontend` directory
   - Update backend CORS to allow frontend URL

2. **Or Serve Frontend from Backend**:
   - Add static file serving to `server.js`
   - Point to frontend build directory
   - Single deployment

---

## Need More Help?

Check the following in Railway:

1. **Logs**: Real-time view of what's happening
2. **Metrics**: CPU, Memory, Network usage
3. **Variables**: Ensure all are set correctly
4. **Settings**: Verify start command and build command

Common log messages to look for:

- ✅ "Backend server running on port..." = SUCCESS
- ✅ "Database connected successfully" = SUCCESS
- ❌ "Error: connect ECONNREFUSED" = Database issue
- ❌ "Error: listen EADDRINUSE" = Port conflict
- ❌ "Cannot find module" = Dependency issue
