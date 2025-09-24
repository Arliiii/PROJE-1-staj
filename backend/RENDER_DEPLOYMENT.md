# Render Deployment Guide

This guide will help you deploy your Rails application with PostgreSQL to Render.com.

## Files Created

### 1. `bin/render-build.sh`
Build script that:
- Installs gem dependencies
- Precompiles assets for production
- Cleans old assets

### 2. `render.yaml`
Render configuration file that defines:
- PostgreSQL database service (free tier)
- Rails web service configuration
- Environment variables setup

## Deployment Steps

### 1. Prepare Your Application

Make sure your Rails app is ready:
- All changes committed to Git
- PostgreSQL migration completed
- Application tested locally

### 2. Create Render Account

1. Go to [Render.com](https://render.com)
2. Create an account
3. Verify your email
4. Connect your GitHub account

### 3. Create PostgreSQL Database

1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Configure database:
   - **Name**: `mysite` (or your preferred name)
   - **Database**: `mysite`
   - **User**: `mysite`
   - **Region**: Choose closest to your users
   - **Plan**: Free (or paid for better performance)
4. Click "Create Database"
5. **Save the Internal Database URL** - you'll need it for the web service

### 4. Create Web Service

1. Click "New +" → "Web Service"
2. Connect your repository:
   - Select your GitHub repository containing this Rails app
   - Choose the branch (usually `main`)
3. Configure service:
   - **Name**: `mysite` (or your preferred name)
   - **Runtime**: Ruby
   - **Build Command**: `./bin/render-build.sh; bundle exec rails db:migrate`
   - **Start Command**: `bundle exec rails server`
   - **Plan**: Free (or paid for better performance)

### 5. Set Environment Variables

Add these environment variables to your web service:

#### Required Variables:
- **`DATABASE_URL`**: 
  - Use the Internal Database URL from step 3
  - Format: `postgresql://user:password@hostname:port/database`

- **`RAILS_MASTER_KEY`**: 
  - Copy content from `config/master.key`
  - This is needed for credentials decryption

- **`WEB_CONCURRENCY`**: 
  - Set to `2` (good default for free tier)
  - Controls number of worker processes

#### Optional Variables:
- **`RAILS_ENV`**: `production` (usually set automatically)
- **`RACK_ENV`**: `production` (usually set automatically)

### 6. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Build your application
   - Run database migrations
   - Start your Rails server
3. Monitor the deployment logs for any issues

### 7. Configure Domain (Optional)

- Free tier provides a `.onrender.com` subdomain
- Paid plans allow custom domains

## Important Notes

### Database Considerations
- **Free PostgreSQL**: 
  - 1GB storage limit
  - Shared CPU/memory
  - Suitable for development/testing
- **Paid PostgreSQL**: 
  - More storage and performance
  - Dedicated resources

### Web Service Limitations
- **Free tier**: 
  - Sleeps after 15 minutes of inactivity
  - 750 hours/month limit
  - Slower cold starts
- **Paid tiers**: 
  - Always-on
  - Better performance
  - More concurrent connections

### Build Process
The `render-build.sh` script will:
1. Install all gem dependencies
2. Precompile assets (CSS, JavaScript)
3. Clean old asset files
4. Run database migrations (via build command)

### Environment Variables Security
- `RAILS_MASTER_KEY`: Keep this secret, don't commit to Git
- `DATABASE_URL`: Automatically provided by Render
- All environment variables are encrypted at rest

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Ruby version compatibility
   - Verify all gems are compatible with production
   - Check asset compilation errors

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is correct
   - Ensure database is created and running
   - Check network connectivity

3. **Application Errors**:
   - Check logs in Render dashboard
   - Verify `RAILS_MASTER_KEY` is correct
   - Ensure all required environment variables are set

4. **Asset Issues**:
   - Verify asset precompilation works locally
   - Check for missing asset dependencies
   - Ensure proper asset configuration

### Useful Commands for Local Testing

```bash
# Test build script locally
./bin/render-build.sh

# Test production setup locally
RAILS_ENV=production rails server

# Check asset precompilation
RAILS_ENV=production rails assets:precompile

# Test database connection
rails db:migrate RAILS_ENV=production
```

### Monitoring

- Use Render dashboard to monitor:
  - Application logs
  - Database performance
  - Service health
  - Build history

## Next Steps After Deployment

1. **Test your application** thoroughly in production
2. **Set up monitoring** and error tracking
3. **Configure backups** for your database
4. **Set up CI/CD** for automated deployments
5. **Consider upgrading** to paid plans for production workloads

## Support

- [Render Documentation](https://render.com/docs)
- [Rails Deployment Guide](https://render.com/docs/deploy-rails)
- [PostgreSQL Guide](https://render.com/docs/databases)