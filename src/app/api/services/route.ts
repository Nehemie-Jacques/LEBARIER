import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ services: [] });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Service created' });
}
