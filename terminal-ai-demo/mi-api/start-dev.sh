#!/usr/bin/env bash

set -e

if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Installing dependencies..."
  npm install
fi

if [ ! -f "index.js" ]; then
  echo "Error: index.js not found."
  exit 1
fi

echo "Starting Node.js API..."
node index.js
