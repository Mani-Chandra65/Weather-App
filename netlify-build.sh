#!/bin/bash

# Netlify build script for SkyScope Pro
echo "🌤️ Building SkyScope Pro Client..."

# Navigate to client directory
cd client

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Build the project
echo "🏗️ Building Vite project..."
npm run build

# Verify build output
if [ -d "dist" ]; then
    echo "✅ Build successful! Output directory created."
    ls -la dist/
else
    echo "❌ Build failed! No dist directory found."
    exit 1
fi
