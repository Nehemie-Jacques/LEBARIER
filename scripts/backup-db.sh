#!/bin/bash

# Backup database script
echo "Backing up database..."
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

echo "Database backup completed!"
