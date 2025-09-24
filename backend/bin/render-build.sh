#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing dependencies..."
bundle install

echo "Precompiling assets..."
# Only precompile if we have assets and the app needs them
if [ -d "app/assets" ] && [ "$(ls -A app/assets 2>/dev/null)" ]; then
  SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile
  echo "Cleaning old assets..."
  bundle exec rails assets:clean
else
  echo "No assets found or API-only app, skipping asset precompilation"
fi

echo "Build completed successfully!"