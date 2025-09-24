#!/bin/bash

# PostgreSQL setup script for Ubuntu/Debian systems
# This script installs PostgreSQL and sets up the development environment

echo "Setting up PostgreSQL for Rails application..."

# Update package list
echo "Updating package list..."
sudo apt update

# Install PostgreSQL and contrib package
echo "Installing PostgreSQL and postgresql-contrib..."
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL service
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql.service

# Enable PostgreSQL to start on boot
echo "Enabling PostgreSQL to start on boot..."
sudo systemctl enable postgresql.service

# Create a PostgreSQL user for the Rails app
echo "Creating PostgreSQL user 'postgres' (if not exists)..."
sudo -u postgres createuser -s -i -d -r -l -w postgres 2>/dev/null || echo "User 'postgres' already exists."

# Set password for postgres user (optional, you can set your own)
echo "You can set a password for the postgres user by running:"
echo "sudo -u postgres psql -c \"ALTER USER postgres PASSWORD 'your_password';\""

echo ""
echo "PostgreSQL setup complete!"
echo ""
echo "Next steps:"
echo "1. Install gem dependencies: bundle install"
echo "2. Create databases: rails db:create"
echo "3. Run migrations: rails db:migrate"
echo "4. Seed database (if needed): rails db:seed"
