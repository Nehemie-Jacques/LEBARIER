'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import Logo from '@/components/auth/Logo';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

interface LoginFormProps {
    redirectTo?: string;
}

export default function LoginForm({ redirectTo = '/dashboard' }: LoginFormProps) {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!formData.email) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setFormError('Identifiants invalides. Vérifiez votre email et votre mot de passe.');
                return;
            }

            router.push(redirectTo);
            router.refresh();
        } catch (error) {
            console.error('Login error:', error);
            setFormError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        setFormError(null);
        setIsLoading(true);

        try {
            await signIn(provider, { callbackUrl: redirectTo });
        } catch (error) {
            console.error('Social login error:', error);
            setFormError("Impossible de se connecter avec ce fournisseur pour le moment.");
            setIsLoading(false);
        }
    };

    const getInputClassName = (hasError: boolean) => {
        const baseClass =
            'w-full py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all';
        const borderClass = hasError ? 'border-red-500' : 'border-input';
        return `${baseClass} ${borderClass}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
                    <div className="flex justify-center mb-6">
                        <Logo size="md" />
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Connexion</h1>
                        <p className="text-muted-foreground text-sm">
                            Bienvenue chez Le Barbier, l&apos;excellence masculine.
                        </p>
                    </div>

                    {formError && (
                        <div
                            className="mb-4 rounded-lg border border-error/40 bg-error/5 px-4 py-3 text-sm text-error"
                            role="alert"
                        >
                            {formError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@email.com"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        if (errors.email) setErrors({ ...errors, email: undefined });
                                    }}
                                    className={`${getInputClassName(!!errors.email)} pl-10 pr-4`}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p id="email-error" className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        if (errors.password) setErrors({ ...errors, password: undefined });
                                    }}
                                    className={`${getInputClassName(!!errors.password)} pl-10 pr-12`}
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? 'password-error' : undefined}
                                    autoComplete={rememberMe ? 'current-password' : 'off'}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p id="password-error" className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-primary bg-background border-input rounded focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-foreground">Se souvenir de moi</span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary hover:text-primary-600 transition-colors font-medium"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>CONNEXION EN COURS...</span>
                                </>
                            ) : (
                                'SE CONNECTER'
                            )}
                        </button>

                        <SocialLoginButtons
                            disabled={isLoading}
                            onGoogleLogin={() => handleSocialLogin('google')}
                            onFacebookLogin={() => handleSocialLogin('facebook')}
                        />
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Pas de compte ?{' '}
                        <Link
                            href="/register"
                            className="text-primary hover:text-primary-600 transition-colors font-semibold"
                        >
                            S&apos;inscrire
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    © 2024 LE BARBIER. Tous droits réservés.
                </p>
            </div>
        </div>
    );
}

