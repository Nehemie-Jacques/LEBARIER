import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ appointments: [] });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Appointment created' });
}
