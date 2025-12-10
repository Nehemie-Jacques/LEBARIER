import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ product: null });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: 'Product updated' });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: 'Product deleted' });
}
