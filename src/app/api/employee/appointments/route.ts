/**
 * ============================================
 * 📅 API EMPLOYEE APPOINTMENTS - LE BARBIER
 * ============================================
 * 
 * Endpoint pour que les employés gèrent leurs rendez-vous
 * Accessible uniquement aux EMPLOYEE et ADMIN
 * 
 * @route GET /api/employee/appointments
 */

import { NextResponse } from 'next/server';
import { requireEmployee } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';

/**
 * 📅 Récupérer les rendez-vous de l'employé connecté
 * 
 * @method GET
 * @returns {Promise<NextResponse>} Liste des rendez-vous
 * 
 * @example Postman
 * GET http://localhost:3001/api/employee/appointments
 * Headers: Cookie: (le cookie de session de l'employé)
 * 
 * @example Query params
 * ?status=PENDING (PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED)
 * ?date=2024-12-18 (filtrer par date)
 */
export async function GET(req: Request) {
  // Vérifier que l'utilisateur est employé ou admin
  const { user, error, status } = await requireEmployee();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status');
    const dateFilter = searchParams.get('date');

    // Construire les filtres
    const where: any = {
      employeeId: user!.id,
    };

    if (statusFilter) {
      where.status = statusFilter;
    }

    if (dateFilter) {
      const date = new Date(dateFilter);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      where.date = {
        gte: date,
        lt: nextDay,
      };
    }

    // Récupérer les rendez-vous
    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error('🚨 Erreur lors de la récupération des rendez-vous:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rendez-vous' },
      { status: 500 }
    );
  }
}

/**
 * ✅ Mettre à jour le statut d'un rendez-vous
 * 
 * @method PATCH
 * @returns {Promise<NextResponse>} Rendez-vous mis à jour
 * 
 * @example Postman
 * PATCH http://localhost:3001/api/employee/appointments
 * Headers: Cookie: (le cookie de session)
 * Body: {
 *   "appointmentId": "cm...",
 *   "status": "CONFIRMED"
 * }
 */
export async function PATCH(req: Request) {
  const { user, error, status } = await requireEmployee();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const body = await req.json();
    const { appointmentId, status: newStatus } = body;

    if (!appointmentId || !newStatus) {
      return NextResponse.json(
        { error: 'appointmentId et status sont requis' },
        { status: 400 }
      );
    }

    // Vérifier que le rendez-vous appartient à l'employé
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    // Seul l'employé assigné ou un admin peut modifier
    if (appointment.employeeId !== user!.id && user!.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Vous ne pouvez modifier que vos propres rendez-vous' },
        { status: 403 }
      );
    }

    // Mettre à jour le statut
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: newStatus },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        service: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Statut du rendez-vous mis à jour',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error('🚨 Erreur lors de la mise à jour du rendez-vous:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du rendez-vous' },
      { status: 500 }
    );
  }
}
