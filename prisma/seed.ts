import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Créer un admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lebarbier.com' },
    update: {},
    create: {
      email: 'admin@lebarbier.com',
      name: 'Admin',
      password: await hash('admin123', 10),
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  // Créer des employés
  const employee1 = await prisma.employee.create({
    data: {
      name: 'Jean Dupont',
      email: 'jean@lebarbier.com',
      phone: '+237 690 000 001',
      bio: 'Barbier expert avec 10 ans d\'expérience',
      specialties: ['Coupe classique', 'Barbe', 'Dégradé'],
    },
  });

  // Créer des services
  const service1 = await prisma.service.create({
    data: {
      name: 'Coupe homme',
      slug: 'coupe-homme',
      description: 'Coupe de cheveux professionnelle pour homme',
      duration: 30,
      price: 5000,
      category: 'Coupe',
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: 'Barbe',
      slug: 'barbe',
      description: 'Taille et entretien de barbe',
      duration: 20,
      price: 3000,
      category: 'Barbe',
    },
  });

  // Créer des produits
  await prisma.product.create({
    data: {
      name: 'Cire coiffante',
      slug: 'cire-coiffante',
      description: 'Cire professionnelle pour styling',
      price: 8000,
      stock: 50,
      category: 'Soins',
    },
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
