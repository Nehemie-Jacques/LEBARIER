import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ order: null });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: 'Order updated' });
}
