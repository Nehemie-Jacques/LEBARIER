/**
 * Script pour tester le processus de connexion étape par étape
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🧪 Test du processus de connexion...\n');

  const email = 'test@example.com';
  const password = 'Password123!';

  try {
    // Étape 1: Trouver l'utilisateur
    console.log('📍 Étape 1: Recherche de l\'utilisateur...');
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error('❌ Utilisateur non trouvé');
      return;
    }
    console.log('✅ Utilisateur trouvé:', user.email);

    // Étape 2: Vérifier le mot de passe
    console.log('\n📍 Étape 2: Vérification du mot de passe...');
    if (!user.password) {
      console.error('❌ Aucun mot de passe défini pour cet utilisateur');
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.error('❌ Mot de passe incorrect');
      return;
    }
    console.log('✅ Mot de passe valide');

    // Étape 3: Préparer les données utilisateur
    console.log('\n📍 Étape 3: Préparation des données utilisateur...');
    const userData = {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      emailVerified: user.emailVerified,
    };
    console.log('✅ Données préparées:', userData);

    // Étape 4: Tester la création de log (commenté pour le moment)
    console.log('\n📍 Étape 4: Test de création de log système (DÉSACTIVÉ)');
    console.log('⚠️  La création de logs est désactivée pour le débogage');

    console.log('\n🎉 Tous les tests sont passés avec succès !');
    console.log('✅ La logique de connexion fonctionne correctement');
    console.log('\n💡 L\'erreur 500 vient probablement de NextAuth lui-même');
    console.log('💡 Essayons de vérifier la configuration NextAuth...');

  } catch (error) {
    console.error('\n❌ Erreur pendant le test:', error);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
