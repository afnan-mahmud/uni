#!/bin/bash

echo "🚀 Starting Deployment Process for University ERP..."

# Exit immediately if a command exits with a non-zero status
set -e

# Step 1: Install dependencies
echo "📦 Installing dependencies (npm i)..."
npm i

# Step 2: Build the Next.js application
echo "🏗️ Building the application (npm run build)..."
npm run build

# Step 3: Check if the PM2 process already exists
if pm2 show "university-erp" > /dev/null; then
    echo "🔄 Restarting application with PM2 on Port 3005..."
    PORT=3005 pm2 restart "university-erp" --update-env
else
    echo "▶️ Starting application with PM2 on Port 3005..."
    PORT=3005 pm2 start npm --name "university-erp" -- run start -- -p 3005
fi

# Step 4: Save PM2 configuration to revive on system reboot
echo "💾 Saving PM2 process list (pm2 save)..."
pm2 save

echo "✅ Deployment Successful! The application is running on port 3005."
