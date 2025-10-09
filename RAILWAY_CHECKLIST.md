# 🚂 Railway Deployment Diagnostic Checklist

Follow this checklist step-by-step to identify and fix your deployment issue.

---

## ✅ STEP 1: Check What Railway Deployed

Go to your Railway dashboard and answer these questions:

- [ ] Which service did Railway deploy? (backend, frontend, or root?)
- [ ] Is the deployment status "Active" or "Failed"?
- [ ] What is your Railway app URL? (e.g., `https://xxx.railway.app`)

---

## ✅ STEP 2: Check Build Logs

1. Railway Dashboard → Your Service → **Deployments** tab
2. Click on the latest deployment
3. Look at **Build Logs**

### What Success Looks Like:
```
✓ npm install completed
✓ Dependencies installed successfully
✓ Build completed
```

### Common Build Errors:
- ❌ `npm ERR! code ENOENT` → Missing package.json
- ❌ `Cannot find module` → Missing dependencies
- ❌ `EACCES permission denied` → File permission issues

**If build fails, check:**
- [ ] `package.json` exists in the root directory
- [ ] All dependencies are listed in `package.json`
- [ ] No syntax errors in `package.json`

---

## ✅ STEP 3: Check Deploy Logs

In the same deployment view, check **Deploy Logs** (runtime logs):

### What Success Looks Like:
```
🚀 Backend server running on port 3001
✅ Database connected successfully
📊 Health check: http://localhost:3001/health
```

### Common Deploy Errors:

#### Error 1: "Application failed to respond"
```
Application failed to respond on port $PORT
```
**Cause**: App isn't listening or crashed
**Fix**: See Step 4

#### Error 2: Database Connection Failed
```
❌ Database connection failed: connect ECONNREFUSED
```
**Cause**: Database not configured
**Fix**: See Step 5

#### Error 3: Port Already in Use
```
Error: listen EADDRINUSE: address already in use
```
**Cause**: Wrong port configuration
**Fix**: See Step 6

#### Error 4: Module Not Found
```
Error: Cannot find module 'express'
```
**Cause**: Dependencies not installed
**Fix**: Redeploy after running `npm install` locally

---

## ✅ STEP 4: Verify Environment Variables

Railway Dashboard → Your Service → **Variables** tab

### Required Variables:

Copy these exactly into Railway:

```bash
# Railway provides PORT automatically - just reference it
PORT=${{PORT}}

# Set environment
NODE_ENV=production

# Database configuration (if using Railway MySQL)
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_NAME=FormMaker
```

### Important Notes:
- `${{VARIABLE}}` syntax references Railway's built-in variables
- Don't hardcode database credentials
- `PORT` is automatically provided by Railway

**Checklist:**
- [ ] `PORT` variable is set
- [ ] `NODE_ENV=production` is set
- [ ] Database variables are set (if using database)
- [ ] No typos in variable names

---

## ✅ STEP 5: Add MySQL Database (If Not Done)

1. Railway Dashboard → Your Project
2. Click **"+ New"** → **"Database"** → **"Add MySQL"**
3. Wait 1-2 minutes for provisioning
4. Railway automatically creates these variables:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

5. Reference them in your backend service (see Step 4)

**Checklist:**
- [ ] MySQL database service created
- [ ] Database shows "Active" status
- [ ] Environment variables appear in Railway
- [ ] Backend references these variables

---

## ✅ STEP 6: Initialize Database Schema

Your app needs the `Canvas` table to exist. Two options:

### Option A: Using Railway MySQL Console

1. Railway Dashboard → MySQL Service → **Data** tab
2. Click **"Query"**
3. Copy and paste contents of `database/railway-init.sql`
4. Click **"Run Query"**

### Option B: Using MySQL Client

1. Get connection string from Railway (MySQL service → Connect)
2. Use a MySQL client (TablePlus, DBeaver, or CLI):
   ```bash
   mysql -h your-host -P 3306 -u root -p
   ```
3. Run the `database/railway-init.sql` script

**Checklist:**
- [ ] Database `FormMaker` exists
- [ ] Table `Canvas` exists
- [ ] Sample data inserted (optional)

---

## ✅ STEP 7: Verify Service Configuration

Railway Dashboard → Your Service → **Settings** tab

### Build Settings:
- **Build Command**: `npm install` (or leave empty for auto-detect)
- **Watch Paths**: Leave empty or use `/backend/**` if deploying from monorepo

### Deploy Settings:
- **Start Command**: `npm start`
- **Restart Policy**: ON_FAILURE
- **Health Check Path**: `/health` (optional but recommended)

### Root Directory:
- If deploying backend only: Leave empty (uses root)
- If project has multiple services: Set to `/backend`

**Checklist:**
- [ ] Start command is set correctly
- [ ] Root directory matches your structure
- [ ] No custom Dockerfile being used (unless intentional)

---

## ✅ STEP 8: Test Your Deployment

Once deployed, test these endpoints:

### Test 1: Health Check
```bash
curl https://your-app.railway.app/health
```

**Expected Response:**
```json
{"status":"OK","timestamp":"2025-10-09T12:00:00.000Z"}
```

**If this fails:**
- App didn't start correctly
- Check deploy logs for errors
- Verify PORT environment variable

### Test 2: Canvas API
```bash
curl https://your-app.railway.app/api/canvas
```

**Expected Response:**
```json
[
  {"id":1,"Name":"Sample Form","Type":"form","Width":400,"Height":300}
]
```

**If this fails but health check works:**
- Database connection issue
- Table doesn't exist
- Check DB variables

### Test 3: Verbose Check
```bash
curl -v https://your-app.railway.app/health
```

Look for:
- Status code: `200 OK`
- Response body with JSON
- No 502 or 503 errors

---

## ✅ STEP 9: Common Issues & Solutions

### Issue: "Railway Front Page Only"

This usually means one of these:

#### Scenario 1: App didn't start
**Symptoms**: Logs show errors, app crashes immediately
**Fix**: 
1. Check deploy logs for error messages
2. Fix the error in your code
3. Push to GitHub to redeploy

#### Scenario 2: Wrong port
**Symptoms**: Logs show "running on port X" but Railway can't connect
**Fix**:
1. Verify app uses `process.env.PORT`
2. Verify app binds to `0.0.0.0`, not `127.0.0.1`
3. Check your code: `app.listen(PORT, '0.0.0.0', ...)`

#### Scenario 3: Database connection failed
**Symptoms**: App starts but crashes when accessing database
**Fix**:
1. Verify MySQL database is provisioned
2. Check environment variables are set
3. Initialize database schema (Step 6)

#### Scenario 4: Wrong service deployed
**Symptoms**: Frontend files deployed instead of backend
**Fix**:
1. Railway Settings → Root Directory → Leave empty
2. Ensure root `package.json` has correct start script
3. Redeploy

### Issue: "502 Bad Gateway"

**Cause**: App started but crashed after startup
**Fix**:
1. Check deploy logs for runtime errors
2. Look for database connection errors
3. Verify all environment variables are set
4. Check for uncaught exceptions in code

### Issue: "Application Error"

**Cause**: Build or start command failed
**Fix**:
1. Test locally: `npm install && npm start`
2. Check for missing dependencies
3. Verify start script in package.json
4. Check build logs for specific errors

---

## ✅ STEP 10: Verify Your Setup

Test locally to ensure everything works:

```bash
# Set environment variables
export PORT=3001
export NODE_ENV=production
export DB_HOST=your-railway-mysql-host
export DB_PORT=3306
export DB_USER=root
export DB_PASSWORD=your-password
export DB_NAME=FormMaker

# Install and start
npm install
npm start

# In another terminal, test
curl http://localhost:3001/health
curl http://localhost:3001/api/canvas
```

**If it works locally but not on Railway:**
- Environment variables might be different
- Database connection might be blocked
- Check Railway logs for specific errors

---

## 📋 Quick Reference

### Railway Dashboard URLs:
- Project: https://railway.app/project/YOUR_PROJECT_ID
- Deployments: Click on service → Deployments tab
- Variables: Click on service → Variables tab
- Logs: Click on service → Deployments → Latest deployment

### Your App Files:
- Entry point: `backend/src/server.js`
- Package.json: Root `package.json` and `backend/package.json`
- Database config: `backend/src/config/database.js`
- Database init: `database/railway-init.sql`

### Key Environment Variables:
- `PORT`: Railway provides automatically
- `NODE_ENV`: Set to "production"
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: From MySQL service

---

## 🆘 Still Not Working?

### Collect This Information:

1. **Railway Logs** (last 50 lines):
   - Build logs
   - Deploy logs
   - Runtime logs

2. **Environment Variables**:
   - Screenshot (hide sensitive values)
   - Verify all required vars are set

3. **Service Settings**:
   - Start command
   - Build command
   - Root directory

4. **Database Status**:
   - MySQL service active?
   - Can you connect manually?
   - Tables exist?

5. **Error Messages**:
   - Exact error from logs
   - When it occurs (build, deploy, runtime)

### Debug Commands:

```bash
# Check if Railway app responds at all
curl -I https://your-app.railway.app

# Check specific endpoint
curl -v https://your-app.railway.app/health

# Test from Railway's perspective
railway logs
railway status
```

---

## ✨ Success Indicators

You'll know it's working when:

- [ ] Build logs show successful npm install
- [ ] Deploy logs show "Backend server running on port..."
- [ ] Deploy logs show "Database connected successfully"
- [ ] Health endpoint returns 200 OK
- [ ] Canvas API returns data
- [ ] No errors in Railway logs
- [ ] App URL shows your API response (not Railway front page)

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway Node.js Guide](https://docs.railway.app/guides/nodejs)
- [Railway Environment Variables](https://docs.railway.app/develop/variables)
- [Railway MySQL Guide](https://docs.railway.app/databases/mysql)

---

**Need more help? Share your Railway logs and I can help debug further!**

