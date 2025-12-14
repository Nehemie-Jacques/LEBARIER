'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, 'Minimum 8 caractères')
        .regex(/[A-Z]/, 'Une majuscule requise')
        .regex(/[a-z]/, 'Une minuscule requise')
        .regex(/[0-9]/, 'Un chiffre requis')
        .regex(/[^A-Za-z0-9]/, 'Un caractère spécial requis'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const password = watch('password');

    // Vérifications de force du mot de passe
    const passwordChecks = {
        length: password?.length >= 8,
        uppercase: /[A-Z]/.test(password || ''),
        lowercase: /[a-z]/.test(password || ''),
        number: /[0-9]/.test(password || ''),
        special: /[^A-Za-z0-9]/.test(password || ''),
    };

    useEffect(() => {
        if (!token || !email) {
            setIsValidToken(false);
            console.error('❌ Lien invalide ou expiré');
        }
    }, [token, email]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token || !email) {
            alert('❌ Informations manquantes');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/reset-password', {
                ...data,
                token,
                email,
            });

            if (response.data.success) {
                alert('✅ Mot de passe réinitialisé avec succès !');
                router.push('/login');
            }
        } catch (error: any) {
            console.error('Reset password error:', error);

            if (error.response?.data?.error) {
                alert('❌ ' + error.response.data.error);
            } else {
                alert('❌ Une erreur est survenue');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isValidToken) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
                <div className="w-full max-w-md text-center">
                    {/* Error Icon */}
                    <div className="mx-auto w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle className="w-12 h-12 text-error" />
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-charcoal-900 mb-4">
                        Lien invalide ou expiré
                    </h2>

                    <p className="text-charcoal-600 mb-8">
                        Ce lien de réinitialisation n&apos;est plus valide. Veuillez faire une nouvelle demande.
                    </p>

                    <Link href="/forgot-password">
                        <Button className="w-full" size="lg">
                            Demander un nouveau lien
                        </Button>
                    </Link>

                    <div className="mt-6">
                        <Link
                            href="/login"
                            className="text-sm text-primary hover:text-primary-600 transition-colors"
                        >
                            Retour à la connexion
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-charcoal-900">
                        LE BARBIER
                    </h2>
                    <p className="text-primary text-sm font-heading uppercase tracking-wider mt-2">
                        Excellence • Prestige
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white shadow-dark-lg rounded-none p-8">
                    {/* Titre */}
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">
                            Nouveau mot de passe
                        </h3>
                        <p className="text-sm text-charcoal-600">
                            Créez un nouveau mot de passe sécurisé pour votre compte
                        </p>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email (read-only) */}
                        <div>
                            <label className="block text-sm font-heading font-medium text-charcoal-700 mb-2">
                                Email
                            </label>
                            <Input
                                type="email"
                                value={email || ''}
                                disabled
                                className="input-premium bg-gray-50"
                            />
                        </div>

                        {/* Nouveau mot de passe */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-heading font-medium text-charcoal-700 mb-2">
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="pl-12 pr-12 input-premium"
                                    {...register('password')}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Indicateurs de force */}
                            {password && (
                                <div className="mt-3 space-y-1.5">
                                    <div className="flex items-center space-x-2 text-xs">
                                        <CheckCircle className={`h-3 w-3 ${passwordChecks.length ? 'text-success' : 'text-gray-300'}`} />
                                        <span className={passwordChecks.length ? 'text-success' : 'text-gray-500'}>
                                            8 caractères minimum
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs">
                                        <CheckCircle className={`h-3 w-3 ${passwordChecks.uppercase ? 'text-success' : 'text-gray-300'}`} />
                                        <span className={passwordChecks.uppercase ? 'text-success' : 'text-gray-500'}>
                                            Une majuscule
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs">
                                        <CheckCircle className={`h-3 w-3 ${passwordChecks.lowercase ? 'text-success' : 'text-gray-300'}`} />
                                        <span className={passwordChecks.lowercase ? 'text-success' : 'text-gray-500'}>
                                            Une minuscule
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs">
                                        <CheckCircle className={`h-3 w-3 ${passwordChecks.number ? 'text-success' : 'text-gray-300'}`} />
                                        <span className={passwordChecks.number ? 'text-success' : 'text-gray-500'}>
                                            Un chiffre
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs">
                                        <CheckCircle className={`h-3 w-3 ${passwordChecks.special ? 'text-success' : 'text-gray-300'}`} />
                                        <span className={passwordChecks.special ? 'text-success' : 'text-gray-500'}>
                                            Un caractère spécial
                                        </span>
                                    </div>
                                </div>
                            )}

                            {errors.password && (
                                <p className="mt-2 text-sm text-error">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirmation */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-heading font-medium text-charcoal-700 mb-2">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="pl-12 pr-12 input-premium"
                                    {...register('confirmPassword')}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-error">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
                        </Button>
                    </form>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-charcoal-600 mt-6">
                    Vous vous souvenez de votre mot de passe ?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:text-primary-600 transition-colors"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}