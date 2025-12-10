#!/bin/bash

# Seed database script
echo "Seeding database..."
npx prisma db seed

echo "Database seeded successfully!"
