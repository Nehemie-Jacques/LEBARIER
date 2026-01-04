#!/bin/bash

# Script pour corriger les champs User incorrects dans les API routes
# Remplace 'name:' par 'firstName:' et 'lastName:' et 'image:' par 'avatar:'

echo "🔧 Correction des champs User dans les API routes..."

# Fichiers à corriger
files=(
  "src/app/api/orders/route.ts"
  "src/app/api/orders/[id]/route.ts"
  "src/app/api/reviews/route.ts"
  "src/app/api/reviews/[id]/route.ts"
  "src/app/api/employee/appointments/route.ts"
)

# Compteur
count=0

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Traitement de $file..."
    
    # Backup du fichier
    cp "$file" "$file.bak"
    
    # Les remplacements seront faits manuellement car le contexte est important
    echo "   ⚠️  Fichier sauvegardé en $file.bak - correction manuelle requise"
    ((count++))
  else
    echo "⚠️  Fichier non trouvé: $file"
  fi
done

echo ""
echo "✅ $count fichiers sauvegardés"
echo ""
echo "📋 Instructions:"
echo "   1. Dans 'user' select, remplacer 'name: true' par 'firstName: true, lastName: true'"
echo "   2. Dans 'user' select, remplacer 'image: true' par 'avatar: true'"
echo "   3. Dans les relations product/service, garder 'name: true' (c'est correct)"
echo ""
