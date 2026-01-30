# 📖 Command Reference Guide

## Quick Start (Copy & Paste)

### First Time Setup
```bash
cd d:\jojiya\inertia
composer install
npm install --legacy-peer-deps
php artisan migrate
npm run build
```

### Daily Development
```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

---

## Laravel Commands

### Serve the Application
```bash
# Default (localhost:8000)
php artisan serve

# Custom port
php artisan serve --port=8001

# Custom host
php artisan serve --host=0.0.0.0
```

### Database & Migrations
```bash
# Run pending migrations
php artisan migrate

# Show migration status
php artisan migrate:status

# Rollback last batch
php artisan migrate:rollback

# Rollback all
php artisan migrate:reset

# Fresh (reset + migrate)
php artisan migrate:fresh

# Fresh with seeding
php artisan migrate:fresh --seed
```

### Make New Components
```bash
# Model with migration
php artisan make:model ModelName -m

# Controller
php artisan make:controller ControllerName

# Controller with resource methods
php artisan make:controller ControllerName --resource

# Policy
php artisan make:policy PolicyName --model=ModelName

# Migration only
php artisan make:migration create_table_name

# Seeder
php artisan make:seeder SeederName

# Factory
php artisan make:factory FactoryName --model=ModelName
```

### Routes
```bash
# List all routes
php artisan route:list

# Show specific routes
php artisan route:list --name=teams

# Show routes for a controller
php artisan route:list --controller=TeamController

# Show API routes
php artisan route:list --prefix=api
```

### Caching & Optimization
```bash
# Clear all caches
php artisan optimize:clear

# Clear specific caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Database Tinker (Interactive Shell)
```bash
# Start tinker
php artisan tinker

# Inside tinker
User::all()
User::find(1)
User::create(['name' => 'John', 'email' => 'john@test.com', 'password' => bcrypt('password'), 'role' => 'employee'])
Team::all()
DB::table('users')->count()
exit  # Exit tinker
```

### Testing
```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/TeamTest.php

# Run with coverage
php artisan test --coverage

# Watch for changes
php artisan test --watch
```

### Queue & Jobs (if added)
```bash
php artisan queue:work
php artisan queue:listen
php artisan queue:failed
```

---

## NPM/Frontend Commands

### Development
```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check (TypeScript)
npm run check
# or
tsc
```

### Package Management
```bash
# Install dependencies
npm install

# Install with legacy peer deps (required for this project)
npm install --legacy-peer-deps

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update packages
npm update

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## Useful Development Shortcuts

### Create and Run in One Go
```bash
# Create team and show routes
php artisan make:controller TeamController --resource && php artisan route:list --name=team

# Create model with everything
php artisan make:model Team -mcp  # model, migration, controller, policy

# Options: 
# -m : migration
# -c : controller
# -r : resource controller
# -p : policy
# -f : factory
# -s : seeder
# -a : all
```

### Database Seeding
```bash
# Run all seeders
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=UserSeeder

# Fresh with seed
php artisan migrate:fresh --seed
```

### Reset Everything (Development Only)
```bash
# CAUTION: Deletes all data
php artisan migrate:fresh
php artisan db:seed
```

---

## Git & Version Control

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin branch-name

# Pull
git pull origin branch-name

# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout branch-name

# View history
git log --oneline

# See differences
git diff
```

---

## File & Code Management

### Create Files
```bash
# Create controller
php artisan make:controller AdminController

# Create model
php artisan make:model Admin

# Create migration
php artisan make:migration create_admins_table

# Create policy
php artisan make:policy AdminPolicy --model=Admin

# Create form request
php artisan make:request StoreAdminRequest
```

### View File Structure
```bash
# Show directory tree
tree

# Show only PHP files
tree app/

# Count files
find . -type f | wc -l

# Show file size
du -sh .

# Show disk usage by directory
du -sh *
```

---

## Environment & Configuration

### Edit .env
```bash
# View environment
cat .env

# Edit environment (Windows)
notepad .env

# Edit environment (Linux/Mac)
nano .env
vi .env
```

### Key .env Variables
```env
# App
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:xxxx
APP_DEBUG=true
APP_URL=http://localhost

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inertia
DB_USERNAME=root
DB_PASSWORD=

# Mail (if needed)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
```

---

## Docker Commands (If Using Docker)

```bash
# Build image
docker-compose build

# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Access container
docker-compose exec app bash
```

---

## PHP Commands

### Check PHP Version
```bash
php -v

# Check installed extensions
php -m

# Check PHP info
php -i

# Run PHP file
php filename.php

# PHP lint (check syntax)
php -l filename.php

# Start built-in server
php -S localhost:8000
```

### Composer Commands
```bash
# Install dependencies
composer install

# Update dependencies
composer update

# Install only production dependencies
composer install --no-dev

# Show installed packages
composer show

# Dump autoloader
composer dump-autoload

# Validate composer.json
composer validate

# Show outdated packages
composer outdated
```

---

## MySQL/Database Commands

```bash
# Connect to MySQL
mysql -u root -p

# Inside MySQL
# Show databases
SHOW DATABASES;

# Use specific database
USE inertia;

# Show tables
SHOW TABLES;

# Show table structure
DESC users;
DESCRIBE teams;

# Count rows
SELECT COUNT(*) FROM users;

# View all data
SELECT * FROM users;

# Create database
CREATE DATABASE inertia;

# Drop database
DROP DATABASE inertia;
```

---

## Windows Terminal Shortcuts

```bash
# Split terminal vertically
Alt + Shift + D

# Split terminal horizontally
Alt + Shift + -

# Focus pane
Alt + Arrow Keys

# Rename tab
Ctrl + Shift + Alt + R

# New tab
Ctrl + Shift + T

# Close tab
Ctrl + Shift + W
```

---

## VS Code Useful Shortcuts

```
# Open terminal
Ctrl + `

# Open file
Ctrl + P

# Search in files
Ctrl + Shift + F

# Find and replace
Ctrl + H

# Go to line
Ctrl + G

# Toggle sidebar
Ctrl + B

# Format document
Shift + Alt + F

# Expand selection
Shift + Alt + Right Arrow

# Comment line
Ctrl + /

# Multi-line edit
Ctrl + Alt + Down Arrow
```

---

## Common Error Solutions

### "SQLSTATE[HY000]: General error: 1 no such table"
```bash
# Run migrations
php artisan migrate
```

### "Target [AuthServiceProvider] is not instantiable"
```bash
# Clear cache
php artisan optimize:clear
```

### "Port 8000 already in use"
```bash
# Use different port
php artisan serve --port=8001
```

### "npm ERR! peer dep missing"
```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

### "Permission denied"
```bash
# Add execute permission (Linux/Mac)
chmod +x vendor/bin/artisan
```

---

## Performance Monitoring

```bash
# Check server status
php artisan serve --verbose

# Database query count
php artisan tinker
# DB::enableQueryLog()
# Run your queries...
# dd(DB::getQueryLog())

# Check logs
tail -f storage/logs/laravel.log

# View error log
cat storage/logs/laravel.log | tail -50
```

---

## Backup Commands

```bash
# Backup database (MySQL)
mysqldump -u root -p inertia > backup.sql

# Restore database
mysql -u root -p inertia < backup.sql

# Backup whole project
tar -czf project-backup.tar.gz .

# Extract backup
tar -xzf project-backup.tar.gz
```

---

## Production Deployment

```bash
# Prepare for production
APP_ENV=production
APP_DEBUG=false

# Run migrations on production
php artisan migrate --force

# Cache config
php artisan config:cache

# Cache routes
php artisan route:cache

# Optimize autoloader
composer install --no-dev -o

# Clear all caches
php artisan optimize:clear
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev | `php artisan serve` |
| Start frontend | `npm run dev` |
| Run migrations | `php artisan migrate` |
| Build frontend | `npm run build` |
| Show routes | `php artisan route:list` |
| Clear caches | `php artisan optimize:clear` |
| Create model | `php artisan make:model Name -m` |
| Create controller | `php artisan make:controller Name --resource` |
| View logs | `tail -f storage/logs/laravel.log` |
| MySQL connect | `mysql -u root -p` |

---

## Notes

- Always use `--legacy-peer-deps` with npm install for this project
- Keep separate terminals for `php artisan serve` and `npm run dev`
- Database uses SQLite by default (configured in .env)
- For MySQL, update .env DB_* variables
- Migrations are already run (database ready)
- All commands assume you're in project root directory

---

**Happy Coding! 🚀**
