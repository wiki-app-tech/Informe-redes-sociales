#!/usr/bin/env bash
# setup.sh - Initializer script for Social Analytics 360

echo "🚀 Starting setup for Social Analytics 360..."

# 1. Environment file check
if [ ! -f .env.local ]; then
    echo "📋 Copying .env.example to .env.local..."
    cp .env.example .env.local
else
    echo "✅ .env.local already exists."
fi

# 2. Node dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# 3. Python virtualenv & dependencies for FastAPI / Agents
if [ -d "backend" ]; then
    echo "🐍 Setting up Python virtual environment..."
    python3 -m venv backend/venv || python -m venv backend/venv
    source backend/venv/bin/activate || source backend/venv/Scripts/activate
    pip install -r backend/requirements.txt
fi

echo "✨ Setup completed successfully!"
echo "▶️ Run 'npm run dev' to start frontend and API routes."
