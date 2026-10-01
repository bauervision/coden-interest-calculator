#!/usr/bin/env bash
set -euo pipefail

echo "Installing Coden Interest Calculator..."
npm install

echo
echo "Running tests..."
npm test

echo
echo "Checking the production build..."
npm run build

echo
echo "Ready. Start the app with:"
echo "  npm run dev"
