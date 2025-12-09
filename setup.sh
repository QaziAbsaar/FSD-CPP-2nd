#!/bin/bash

# Campus Hub - Quick Start Script for macOS/Linux

echo ""
echo "========================================"
echo "  Campus Hub - Full Stack Platform"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org/"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[✓] Python and Node.js are installed"
echo ""

# Setup Backend
echo "========================================"
echo "  Setting up Backend (Flask)"
echo "========================================"
echo ""

cd backend
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install Python dependencies"
    exit 1
fi

echo ""
echo "[✓] Backend dependencies installed"
echo ""

# Setup Frontend
echo "========================================"
echo "  Setting up Frontend (React)"
echo "========================================"
echo ""

cd ../frontend
echo "Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install npm dependencies"
    exit 1
fi

echo ""
echo "[✓] Frontend dependencies installed"
echo ""

echo "========================================"
echo "  Campus Hub Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start Backend (in terminal 1):"
echo "   cd backend && python3 app.py"
echo ""
echo "2. Start Frontend (in terminal 2):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "Demo Credentials:"
echo "   Admin: admin@campushub.com / admin123"
echo "   Instructor: instructor@campushub.com / instructor123"
echo ""
