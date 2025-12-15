'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Pierre Dubois',
        avatar: 'https://ui-avatars.com/api/?name=Pierre+Dubois&background=C9A961&color=2A2A2A&size=200',
        role: 'Client fidèle',
        rating: 5,
        text: 'Le meilleur salon de coiffure où je sois allé ! Le personnel est professionnel, attentionné et le résultat est toujours impeccable. Je recommande vivement !',
        date: 'Il y a 2 semaines',
    },
    {
        id: 2,
        name: 'Sophie Martin',
        avatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=C9A961&color=2A2A2A&size=200',
        role: 'Cliente régulière',
        rating: 5,
        text: 'Un service exceptionnel ! L\'ambiance est chaleureuse et les coiffeurs sont à l\'écoute. Ma coupe est exactement ce que je voulais. Merci !',
        date: 'Il y a 1 mois',
    },
    {
        id: 3,
        name: 'Thomas Leroy',
        avatar: 'https://ui-avatars.com/api/?name=Thomas+Leroy&background=C9A961&color=2A2A2A&size=200',
        role: 'Nouveau client',
        rating: 5,
        text: 'Première visite et je suis conquis ! Le niveau de professionnalisme est remarquable. Je reviendrai sans hésiter.',
        date: 'Il y a 3 jours',
    },
    {
        id: 4,
        name: 'Marie Lefebvre',
        avatar: 'https://ui-avatars.com/api/?name=Marie+Lefebvre&background=C9A961&color=2A2A2A&size=200',
        role: 'Cliente VIP',
        rating: 5,
        text: 'Un salon haut de gamme avec un service irréprochable. Les produits utilisés sont de qualité premium et le résultat dépasse toujours mes attentes.',
        date: 'Il y a 2 mois',
    },
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                {/* 💬 Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full mb-6">
                        <Quote className="h-5 w-5 text-gold-600" />
                        <span className="text-sm font-heading font-semibold text-gold-700 uppercase tracking-wider">
                            Témoignages
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 mb-6">
                        Ce Que Disent Nos Clients
                    </h2>
                    <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
                        Découvrez les avis de nos clients satisfaits
                    </p>
                </div>

                {/* 🎠 Carousel */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-br from-charcoal-50 to-gold-50 rounded-3xl p-12 shadow-2xl">
                        {/* Quote Icon */}
                        <div className="absolute top-8 left-8 w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center">
                            <Quote className="h-8 w-8 text-gold-600" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            {/* Avatar */}
                            <div className="mb-6">
                                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-gold-500 shadow-lg">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={currentTestimonial.avatar}
                                        alt={currentTestimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1 mb-6">
                                {[...Array(currentTestimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                                ))}
                            </div>

                            {/* Text */}
                            <blockquote className="text-xl md:text-2xl font-serif text-charcoal-900 mb-8 leading-relaxed">
                                &quot;{currentTestimonial.text}&quot;
                            </blockquote>

                            {/* Author */}
                            <div>
                                <p className="font-heading font-bold text-lg text-charcoal-900">
                                    {currentTestimonial.name}
                                </p>
                                <p className="text-charcoal-600">
                                    {currentTestimonial.role}
                                </p>
                                <p className="text-sm text-charcoal-400 mt-2">
                                    {currentTestimonial.date}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                            <button
                                onClick={prevTestimonial}
                                className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all duration-300 group"
                                aria-label="Témoignage précédent"
                            >
                                <ChevronLeft className="h-6 w-6 text-charcoal-900 group-hover:text-white" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all duration-300 group"
                                aria-label="Témoignage suivant"
                            >
                                <ChevronRight className="h-6 w-6 text-charcoal-900 group-hover:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-gold-600'
                                    : 'w-2 bg-charcoal-300 hover:bg-gold-400'
                                    }`}
                                aria-label={`Aller au témoignage ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
