# PostgreSQL Migration Summary

This document outlines all the changes made to migrate from SQLite to PostgreSQL.

## Changes Made

### 1. Gemfile
- **Removed**: `gem "sqlite3", "~> 2.0", groups: [:development, :test]`
- **Updated**: `gem "pg", "~> 1.1", group: :production` → `gem "pg", "~> 1.1"` (removed group restriction)

### 2. Database Configuration (`config/database.yml`)
- **Changed adapter**: `sqlite3` → `postgresql`
- **Updated database names**: From file-based to PostgreSQL database names
- **Added environment variables**: For username, password, and host configuration
- **Added encoding**: `unicode` for PostgreSQL

### 3. Application Code Updates

#### Controller (`app/controllers/api/v1/research_data_controller.rb`)
- **Search queries**: Changed `LIKE` to `ILIKE` for case-insensitive PostgreSQL searches
- **Date grouping**: Changed SQLite `strftime('%Y-%m', publication_date)` to PostgreSQL `DATE_TRUNC('month', publication_date)`

#### Model (`app/models/research_datum.rb`)
- **Scopes**: Changed `LIKE` to `ILIKE` for PostgreSQL compatibility

### 4. Deployment Configuration (`config/deploy.yml`)
- **Added PostgreSQL accessory service** with proper configuration
- **Updated environment variables** for database connection
- **Removed SQLite references** from comments and volumes

### 5. Docker and Git Configuration
- **Updated comments** in `.dockerignore` and `.gitignore` to remove SQLite references
- **Dockerfile already had PostgreSQL client** installed - no changes needed

### 6. Helper Scripts
- **Created**: `scripts/setup_postgres.sh` - Automated PostgreSQL installation script

## Environment Variables Required

For production deployment, the following environment variables need to be set:

### Development/Test
- `DATABASE_USERNAME` (default: "postgres")
- `DATABASE_PASSWORD` (default: "")
- `DATABASE_HOST` (default: "localhost")

### Production
- `DATABASE_USERNAME` (required)
- `POSTGRES_PASSWORD` (required, replaces DATABASE_PASSWORD)
- `DATABASE_HOST` (required)

## Next Steps

1. **Install PostgreSQL** (if not already installed):
   ```bash
   ./scripts/setup_postgres.sh
   ```
   Or manually:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql.service
   ```

2. **Install gem dependencies**:
   ```bash
   bundle install
   ```

3. **Create databases**:
   ```bash
   rails db:create
   ```

4. **Run migrations**:
   ```bash
   rails db:migrate
   ```

5. **Seed database** (if needed):
   ```bash
   rails db:seed
   ```

## Database Names

- **Development**: `staj_proje_1_development`
- **Test**: `staj_proje_1_test`
- **Production**: `staj_proje_1_production`

## PostgreSQL vs SQLite Changes

### Query Differences
- **Case-insensitive search**: `LIKE` → `ILIKE`
- **Date functions**: `strftime()` → `DATE_TRUNC()`
- **Better performance** for larger datasets
- **Full ACID compliance**
- **Better concurrency support**

### Configuration Benefits
- **Environment-based configuration** for different environments
- **Better security** with user/password authentication
- **Scalability** for production workloads
- **Better data integrity** and constraints support

## Troubleshooting

### Common Issues
1. **Connection refused**: Ensure PostgreSQL service is running
2. **Authentication failed**: Check username/password configuration
3. **Database doesn't exist**: Run `rails db:create` first
4. **Permission denied**: Ensure PostgreSQL user has proper permissions

### Useful Commands
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Connect to PostgreSQL
sudo -u postgres psql

# List databases
\l

# Connect to specific database
\c database_name

# List tables
\dt
```