#!/bin/bash

# Railway Deployment Test Script
# Usage: ./test-railway-deployment.sh https://your-app.railway.app

echo "🧪 Railway Deployment Test Script"
echo "=================================="
echo ""

# Check if URL is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Railway app URL"
    echo "Usage: ./test-railway-deployment.sh https://your-app.railway.app"
    exit 1
fi

RAILWAY_URL=$1
echo "🎯 Testing: $RAILWAY_URL"
echo ""

# Test 1: Basic connectivity
echo "📡 Test 1: Basic Connectivity"
echo "------------------------------"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$RAILWAY_URL")
if [ "$HTTP_CODE" == "404" ] || [ "$HTTP_CODE" == "200" ]; then
    echo "✅ Server is responding (HTTP $HTTP_CODE)"
else
    echo "❌ Server not responding (HTTP $HTTP_CODE)"
    echo "   This usually means the app didn't start correctly"
    exit 1
fi
echo ""

# Test 2: Health check endpoint
echo "🏥 Test 2: Health Check Endpoint"
echo "---------------------------------"
HEALTH_RESPONSE=$(curl -s "$RAILWAY_URL/health")
if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
    echo "✅ Health check passed"
    echo "   Response: $HEALTH_RESPONSE"
else
    echo "❌ Health check failed"
    echo "   Response: $HEALTH_RESPONSE"
    exit 1
fi
echo ""

# Test 3: Canvas API endpoint
echo "🎨 Test 3: Canvas API Endpoint"
echo "-------------------------------"
CANVAS_RESPONSE=$(curl -s "$RAILWAY_URL/api/canvas")
if echo "$CANVAS_RESPONSE" | grep -q "\["; then
    echo "✅ Canvas API working"
    echo "   Response: $CANVAS_RESPONSE"
else
    echo "⚠️  Canvas API returned unexpected response"
    echo "   Response: $CANVAS_RESPONSE"
    echo "   This might indicate a database connection issue"
fi
echo ""

# Test 4: Response time
echo "⏱️  Test 4: Response Time"
echo "-------------------------"
RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" "$RAILWAY_URL/health")
echo "⏱️  Response time: ${RESPONSE_TIME}s"
if (( $(echo "$RESPONSE_TIME < 2" | bc -l) )); then
    echo "✅ Good response time"
else
    echo "⚠️  Slow response time (might indicate issues)"
fi
echo ""

# Test 5: CORS headers
echo "🌐 Test 5: CORS Configuration"
echo "------------------------------"
CORS_HEADER=$(curl -s -I "$RAILWAY_URL/health" | grep -i "access-control-allow-origin")
if [ -n "$CORS_HEADER" ]; then
    echo "✅ CORS headers present"
    echo "   $CORS_HEADER"
else
    echo "⚠️  No CORS headers found (might be intentional)"
fi
echo ""

# Test 6: Full verbose test
echo "🔍 Test 6: Detailed Connection Info"
echo "------------------------------------"
echo "Making verbose request to /health..."
curl -v "$RAILWAY_URL/health" 2>&1 | grep -E "(HTTP|Connected|Host)"
echo ""

# Summary
echo "=================================="
echo "✅ Deployment Test Complete!"
echo "=================================="
echo ""
echo "If all tests passed, your Railway deployment is working correctly! 🎉"
echo ""
echo "If tests failed, check:"
echo "  1. Railway deployment logs"
echo "  2. Environment variables (especially database config)"
echo "  3. Database initialization (Canvas table exists?)"
echo "  4. Build and start commands in Railway settings"
echo ""
echo "For detailed troubleshooting, see RAILWAY_CHECKLIST.md"

