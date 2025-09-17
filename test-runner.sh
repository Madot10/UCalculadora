#!/bin/bash

# UCalculadora Test Runner
# Simple script to run all tests locally

set -e

echo "🚀 UCalculadora Test Suite Runner"
echo "================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed  
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "🧪 Running Unit Tests..."
echo "========================"
npm run test:unit || { echo "❌ Unit tests failed"; exit 1; }

echo ""
echo "🔗 Running Integration Tests..."
echo "==============================="
npm run test:integration || { echo "❌ Integration tests failed"; exit 1; }

echo ""
echo "📊 Generating Coverage Report..."
echo "================================"
npm run test:coverage || { echo "❌ Coverage generation failed"; exit 1; }

echo ""
echo "🎭 Running E2E Tests..."
echo "======================="
echo "Installing Playwright browsers (this may take a moment)..."
npm run install:playwright || { echo "❌ Playwright installation failed"; exit 1; }

echo "Running E2E tests..."
npm run test:e2e || { echo "❌ E2E tests failed"; exit 1; }

echo ""
echo "✅ All tests completed successfully!"
echo ""
echo "📁 Test Results:"
echo "  - Coverage report: coverage/lcov-report/index.html"
echo "  - Playwright report: playwright-report/index.html"
echo ""
echo "🌟 Test suite execution completed!"