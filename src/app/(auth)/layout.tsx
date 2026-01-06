import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion - Le Barbier',
  description: "Connectez-vous à votre compte Le Barbier pour gérer vos rendez-vous et profiter de nos services d'excellence masculine.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
