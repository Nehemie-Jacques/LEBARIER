import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header className="site-header p-4 bg-white shadow">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="logo font-bold text-xl">LE BARBIER</Link>
                <nav className="hidden md:flex gap-4">
                    <Link href="/services">Services</Link>
                    <Link href="/booking">Booking</Link>
                    <Link href="/shop">Shop</Link>
                </nav>
            </div>
        </header>
    );
}
