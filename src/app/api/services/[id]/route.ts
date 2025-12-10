import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ service: null });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: 'Service updated' });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: 'Service deleted' });
}
