import React from 'react';
import Link from 'next/link';

export default function MobileMenu() {
    return (
        <div className="mobile-menu md:hidden p-4 bg-white border-b">
            <nav className="flex flex-col gap-2">
                <Link href="/services">Services</Link>
                <Link href="/booking">Booking</Link>
                <Link href="/shop">Shop</Link>
            </nav>
        </div>
    );
}
