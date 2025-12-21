import React from 'react';

export default function HeroSection() {
    return (
        <section className="hero py-12 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero/hero.jpg)' }}>
            <div className="container mx-auto text-center text-white">
                <h1 className="text-4xl font-bold">LE BARBIER</h1>
                <p className="mt-2">Réservez votre expérience coiffure premium</p>
            </div>
        </section>
    );
}
