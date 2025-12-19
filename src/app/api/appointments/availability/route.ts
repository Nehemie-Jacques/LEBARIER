import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get('employeeId');
    const date = searchParams.get('date');

    if (!employeeId || !date) {
      return NextResponse.json(
        { error: 'employeeId et date requis' },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        employeeId,
        date: { gte: targetDate, lt: nextDay },
        status: { in: ['CONFIRMED', 'IN_PROGRESS'] },
      },
      select: { date: true, endTime: true },
    });

    const workStart = 8;
    const workEnd = 18;
    const slots = [];

    for (let hour = workStart; hour < workEnd; hour++) {
      const slotStart = new Date(targetDate);
      slotStart.setHours(hour, 0, 0, 0);
      
      const slotEnd = new Date(targetDate);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      const isBooked = appointments.some((apt) => {
        const aptStart = new Date(apt.date);
        const aptEnd = new Date(apt.endTime);
        return (slotStart >= aptStart && slotStart < aptEnd) ||
               (slotEnd > aptStart && slotEnd <= aptEnd);
      });

      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        available: !isBooked,
      });
    }

    return NextResponse.json({ success: true, slots });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
