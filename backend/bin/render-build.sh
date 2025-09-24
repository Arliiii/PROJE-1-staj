#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing dependencies..."
bundle install

echo "Precompiling assets..."
bundle exec rails assets:precompile

echo "Cleaning old assets..."
bundle exec rails assets:clean

echo "Build completed successfully!"