'use client';

import { Award, Gift, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        name: 'Bronze',
        icon: Award,
        color: 'from-orange-600 to-orange-800',
        points: '0 - 99 pts',
        benefits: ['5% de réduction', 'Accès prioritaire', 'Offres exclusives'],
    },
    {
        name: 'Argent',
        icon: Star,
        color: 'from-gray-400 to-gray-600',
        points: '100 - 299 pts',
        benefits: ['10% de réduction', 'Service express', 'Cadeaux d\'anniversaire', 'Événements VIP'],
    },
    {
        name: 'Or',
        icon: Gift,
        color: 'from-gold-400 to-gold-600',
        points: '300+ pts',
        benefits: ['15% de réduction', 'Coupes gratuites', 'Conciergerie', 'Accès backstage', 'Produits premium'],
    },
];

const benefits = [
    {
        icon: TrendingUp,
        title: 'Gagnez des points',
        description: '1€ dépensé = 1 point gagné',
    },
    {
        icon: Gift,
        title: 'Échangez vos points',
        description: 'Services gratuits et réductions',
    },
    {
        icon: Star,
        title: 'Montez de niveau',
        description: 'Plus d\'avantages à chaque tier',
    },
];

export default function LoyaltySection() {
    return (
        <section className="py-20 bg-charcoal-900 text-white relative overflow-hidden">
            {/* 🎨 Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container-custom relative z-10">
                {/* 🏆 Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 backdrop-blur-sm rounded-full mb-6">
                        <Gift className="h-5 w-5 text-gold-400" />
                        <span className="text-sm font-heading font-semibold text-gold-400 uppercase tracking-wider">
                            Programme de Fidélité
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Soyez Récompensé
                    </h2>
                    <p className="text-lg text-charcoal-300 max-w-2xl mx-auto">
                        Plus vous venez, plus vous gagnez. Profitez d&apos;avantages exclusifs et de récompenses exceptionnelles
                    </p>
                </div>

                {/* 📊 Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-charcoal-800/50 backdrop-blur-sm rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/20 rounded-full mb-4">
                                <benefit.icon className="h-8 w-8 text-gold-400" />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-charcoal-400">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 🎯 Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Card */}
                            <div className="bg-charcoal-800 rounded-2xl p-8 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 hover:transform hover:-translate-y-2">
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${tier.color} rounded-full mb-6 shadow-lg`}>
                                    <tier.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-serif font-bold mb-2">
                                    Tier {tier.name}
                                </h3>
                                <p className="text-gold-400 font-heading font-semibold mb-6">
                                    {tier.points}
                                </p>

                                {/* Benefits */}
                                <ul className="space-y-3">
                                    {tier.benefits.map((benefit, benefitIndex) => (
                                        <li
                                            key={benefitIndex}
                                            className="flex items-center gap-3 text-charcoal-300"
                                        >
                                            <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Highlight for Gold */}
                            {tier.name === 'Or' && (
                                <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500 -z-10" />
                            )}
                        </div>
                    ))}
                </div>

                {/* 🔗 CTA */}
                <div className="text-center">
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-charcoal-900 font-heading font-bold rounded-xl hover:bg-gold-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:transform hover:-translate-y-1"
                    >
                        <Star className="h-5 w-5" />
                        Rejoindre le programme
                    </Link>
                    <p className="mt-4 text-sm text-charcoal-400">
                        Inscription gratuite • Points immédiats • Avantages exclusifs
                    </p>
                </div>
            </div>
        </section>
    );
}
