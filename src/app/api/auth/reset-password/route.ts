import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const resetPasswordSchema = z.object({
    email: z.string().email("❌ Email invalide"),
    token: z.string().min(1, "❌ Token requis"),
    password: z
        .string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
        .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    confirmPassword: z.string(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = resetPasswordSchema.parse(body);

        // Vérifier que les mots de passe correspondent
        if (validatedData.password !== validatedData.confirmPassword) {
            return NextResponse.json(
                { error: 'Les mots de passe ne correspondent pas' },
                { status: 400 }
            );
        }

        // Hasher le token pour comparer
        const hashedToken = crypto
            .createHash("sha256")
            .update(validatedData.token)
            .digest("hex");

        // Rechercher l'utilisateur avec le token et vérifier la validité
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
            include: {
                sessions: {
                    where: {
                        token: hashedToken,
                        expiresAt: {
                            gt: new Date(),
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                },
            },
        });

        if (!user || user.sessions.length === 0) {
            return NextResponse.json(
                {
                    error: 'Token invalide ou expiré. Veuillez demander une nouvelle réinitialisation de mot de passe.'
                },
                { status: 400 }
            );
        }

        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        // Mettre à jour le mot de passe de l'utilisateur 
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
            },
        });

        // Supprimer tous les tokens de reset pour cet utilisateur
        await prisma.session.deleteMany({
            where: { userId: user.id },
        });

        // Log
        await prisma.systemLog.create({
            data: {
                level: 'INFO',
                message: `✅ Mot de passe réinitialisé pour ${user.email}`,
                context: { userId: user.id },
                userId: user.id,
            },
        });

        // Notification
        await prisma.notification.create({
            data: {
                userId: user.id,
                type: 'SYSTEM',
                channel: 'IN_APP',
                title: 'Mot de passe réinitialisé',
                message: 'Votre mot de passe a été réinitialisé avec succès.',
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Mot de passe réinitialisé avec succès.',
        });
    } catch (error) {
        console.error('Reset password error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Données invalides',
                    deteils: error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de la réinitialisation du mot de passe' },
            { status: 500 }
        );
    }
}