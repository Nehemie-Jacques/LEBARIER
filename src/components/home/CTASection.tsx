'use client';

import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white relative overflow-hidden">
            {/* 🎨 Background Effects */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                        }}
                    />
                </div>

                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* ✨ Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-500/20 backdrop-blur-sm rounded-full mb-8 animate-bounce-slow">
                        <Sparkles className="h-10 w-10 text-gold-400" />
                    </div>

                    {/* 📝 Content */}
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                        Prêt pour une transformation ?
                    </h2>
                    <p className="text-xl text-charcoal-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Réservez votre rendez-vous dès maintenant et découvrez l&apos;excellence du service premium.
                        Nos barbiers experts vous attendent pour sublimer votre style.
                    </p>

                    {/* 🎯 CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        {/* Primary CTA */}
                        <Link
                            href="/booking"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-charcoal-900 font-heading font-bold text-lg rounded-xl hover:bg-gold-400 transition-all duration-300 shadow-2xl hover:shadow-gold-500/50 hover:transform hover:-translate-y-1"
                        >
                            <Calendar className="h-6 w-6" />
                            Réserver maintenant
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                        {/* Secondary CTA */}
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-lg rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            Voir nos services
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* 📊 Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/10">
                        <div>
                            <p className="text-4xl font-serif font-bold text-gold-400 mb-2">500+</p>
                            <p className="text-charcoal-400">Clients satisfaits</p>
                        </div>
                        <div>
                            <p className="text-4xl font-serif font-bold text-gold-400 mb-2">5★</p>
                            <p className="text-charcoal-400">Note moyenne</p>
                        </div>
                        <div>
                            <p className="text-4xl font-serif font-bold text-gold-400 mb-2">10+</p>
                            <p className="text-charcoal-400">Années d&apos;expérience</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
