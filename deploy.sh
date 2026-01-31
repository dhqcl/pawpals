#!/bin/bash

# Deploy Script for PetVerse

# Stop on error
set -e

echo "🚀 Starting Deployment..."

# 1. Pull latest code
echo "📦 Pulling latest code..."
git pull origin main

# 2. Rebuild and restart containers
# 2. Rebuild and restart containers
echo "🐳 Building and starting containers..."
# Stop existing containers to release ports
docker-compose down

# Use --build to ensure code changes are reflected
# Use -d for detached mode
docker-compose up -d --build --remove-orphans

echo "✨ Deployment Complete!"
echo "-----------------------------------"
echo "🌐 Web App: http://localhost:9001"
echo "🔌 API: http://localhost:9000"
echo "💾 MinIO Console: http://localhost:9101"
echo "-----------------------------------"
