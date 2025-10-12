#!/bin/bash

# Quick test script
# Replace YOUR_URL with your actual Railway URL

echo "Enter your Railway URL (e.g., https://your-app.railway.app):"
read RAILWAY_URL

echo ""
echo "🧪 Testing Railway Deployment..."
echo "================================"
echo ""

echo "📡 Test 1: Health Check"
echo "-----------------------"
curl -s "$RAILWAY_URL/health" | python3 -m json.tool || echo "Failed to get valid JSON response"
echo ""
echo ""

echo "🎨 Test 2: Canvas API"
echo "---------------------"
curl -s "$RAILWAY_URL/api/canvas" | python3 -m json.tool || echo "Failed to get valid JSON response"
echo ""
echo ""

echo "✅ If you see JSON responses above, your deployment is working!"

