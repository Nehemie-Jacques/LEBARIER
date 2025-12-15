'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Camera, ExternalLink } from 'lucide-react';

const galleryImages = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=800&fit=crop',
        alt: 'Coupe de cheveux moderne',
        category: 'Coupes',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=800&fit=crop',
        alt: 'Taille de barbe professionnelle',
        category: 'Barbe',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=800&fit=crop',
        alt: 'Coiffure stylée',
        category: 'Style',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=800&fit=crop',
        alt: 'Coupe classique',
        category: 'Coupes',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1598518142095-e4d09484588a?w=800&h=800&fit=crop',
        alt: 'Entretien de barbe',
        category: 'Barbe',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=800&fit=crop',
        alt: 'Style moderne',
        category: 'Style',
    },
];

export default function GallerySection() {
    return (
        <section className="py-20 bg-gradient-to-br from-charcoal-50 to-white">
            <div className="container-custom">
                {/* 📸 Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full mb-6">
                        <Camera className="h-5 w-5 text-gold-600" />
                        <span className="text-sm font-heading font-semibold text-gold-700 uppercase tracking-wider">
                            Notre Galerie
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 mb-6">
                        Nos Réalisations
                    </h2>
                    <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
                        Découvrez quelques-unes de nos créations et laissez-vous inspirer pour votre prochain style
                    </p>
                </div>

                {/* 🖼️ Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="absolute inset-0 bg-charcoal-900">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="inline-block px-3 py-1 bg-gold-500 text-charcoal-900 text-xs font-heading font-bold uppercase tracking-wider rounded-full mb-2">
                                        {image.category}
                                    </span>
                                    <h3 className="text-white font-heading font-bold text-lg">
                                        {image.alt}
                                    </h3>
                                </div>

                                {/* Icon */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <ExternalLink className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🔗 CTA */}
                <div className="text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white font-heading font-bold rounded-xl hover:bg-gold-600 hover:text-charcoal-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <Camera className="h-5 w-5" />
                        Voir toute la galerie
                    </Link>
                </div>
            </div>
        </section>
    );
}
