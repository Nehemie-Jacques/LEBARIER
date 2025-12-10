import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ employees: [] });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Employee created' });
}
