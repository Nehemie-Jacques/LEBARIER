/**
 * Script pour créer un utilisateur de test
 * Usage: node scripts/create-test-user.js
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔐 Création d\'un utilisateur de test...\n');

  const email = 'test@example.com';
  const password = 'Password123!';

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('⚠️  L\'utilisateur existe déjà !');
    console.log('📧 Email:', existingUser.email);
    console.log('👤 Nom:', existingUser.firstName, existingUser.lastName);
    console.log('🔑 ID:', existingUser.id);
    console.log('\n✅ Vous pouvez utiliser ces credentials pour vous connecter');
    return;
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 12);

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      phone: '+237600000000',
      role: 'CLIENT',
      isActive: true,
      loyaltyPoints: 0,
      loyaltyTier: 'BRONZE',
    },
  });

  console.log('✅ Utilisateur créé avec succès !\n');
  console.log('📧 Email:', user.email);
  console.log('🔒 Mot de passe:', password);
  console.log('👤 Nom:', user.firstName, user.lastName);
  console.log('🔑 ID:', user.id);
  console.log('\n🎉 Vous pouvez maintenant vous connecter avec ces credentials !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
