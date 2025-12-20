import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createProductSchema = z.object({
  name: z.string().min(2),
  nameEn: z.string().min(2),
  slug: z.string().min(2),
  description: z.string(),
  descriptionEn: z.string(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  category: z.string(),
  brand: z.string().optional(),
  stock: z.number().int().min(0),
  sku: z.string().optional(),
  images: z.array(z.string().url()),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const isFeatured = searchParams.get('isFeatured');
    const isActive = searchParams.get('isActive');
    const inStock = searchParams.get('inStock');
    const search = searchParams.get('search');

    const where: any = {};

    if (category) where.category = category;
    if (isFeatured !== null) where.isFeatured = isFeatured === 'true';
    if (isActive !== null) where.isActive = isActive === 'true';
    else where.isActive = true;
    if (inStock === 'true') where.stock = { gt: 0 };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameEn: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });

    const total = products.length;
    const categories = await prisma.product.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: true,
    });

    const byCategory = categories.reduce((acc, item) => {
      acc[item.category] = item._count;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      products,
      statistics: {
        total,
        byCategory,
        featured: products.filter((p) => p.isFeatured).length,
        inStock: products.filter((p) => p.stock > 0).length,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { user, error, status } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const data = createProductSchema.parse(body);

    const existingSlug = await prisma.product.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      return NextResponse.json({ error: 'Slug déjà utilisé' }, { status: 400 });
    }

    const product = await prisma.product.create({ data });

    return NextResponse.json(
      { success: true, message: 'Produit créé', product },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
