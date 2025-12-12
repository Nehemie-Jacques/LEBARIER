import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Créer un admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lebarbier.com' },
    update: {},
    create: {
      email: 'admin@lebarbier.com',
      firstName: 'Admin',
      lastName: 'Le Barbier',
      phone: '+237 690 000 000',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin created:', admin.email);

  // Créer un utilisateur qui sera employé
  const employeeUser = await prisma.user.upsert({
    where: { email: 'jean@lebarbier.com' },
    update: {},
    create: {
      email: 'jean@lebarbier.com',
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '+237 690 000 001',
      password: await bcrypt.hash('employee123', 10),
      role: 'EMPLOYEE',
      emailVerified: new Date(),
    },
  });

  // Créer l'employé lié à l'utilisateur
  const employee1 = await prisma.employee.upsert({
    where: { userId: employeeUser.id },
    update: {},
    create: {
      userId: employeeUser.id,
      bio: 'Barbier expert avec 10 ans d\'expérience',
      bioEn: 'Expert barber with 10 years of experience',
      specialties: ['Coupe classique', 'Barbe', 'Dégradé'],
    },
  });

  console.log('✅ Employee created:', employeeUser.email);

  // Créer des services
  const service1 = await prisma.service.upsert({
    where: { slug: 'coupe-homme' },
    update: {},
    create: {
      name: 'Coupe homme',
      nameEn: 'Men\'s haircut',
      slug: 'coupe-homme',
      description: 'Coupe de cheveux professionnelle pour homme',
      descriptionEn: 'Professional men\'s haircut',
      duration: 30,
      price: 5000,
      category: 'COUPE',
      image: '/images/services/coupe.jpg',
    },
  });

  const service2 = await prisma.service.upsert({
    where: { slug: 'barbe' },
    update: {},
    create: {
      name: 'Barbe',
      nameEn: 'Beard',
      slug: 'barbe',
      description: 'Taille et entretien de barbe',
      descriptionEn: 'Beard trimming and maintenance',
      duration: 20,
      price: 3000,
      category: 'BARBE',
      image: '/images/services/barbe.jpg',
    },
  });

  console.log('✅ Services created:', service1.name, service2.name);

  // Créer des produits
  const product1 = await prisma.product.upsert({
    where: { slug: 'cire-coiffante' },
    update: {},
    create: {
      name: 'Cire coiffante',
      nameEn: 'Styling wax',
      slug: 'cire-coiffante',
      description: 'Cire professionnelle pour styling',
      descriptionEn: 'Professional styling wax',
      price: 8000,
      stock: 50,
      category: 'STYLING',
      images: ['/images/products/cire.jpg'],
    },
  });

  console.log('✅ Product created:', product1.name);

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`   - Admin: admin@lebarbier.com / admin123`);
  console.log(`   - Employee: jean@lebarbier.com / employee123`);
  console.log(`   - Services: ${service1.name}, ${service2.name}`);
  console.log(`   - Products: ${product1.name}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
