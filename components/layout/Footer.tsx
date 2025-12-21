import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer bg-gray-50 py-6 mt-12">
            <div className="container mx-auto text-center text-sm text-gray-600">© {new Date().getFullYear()} LE BARBIER. Tous droits réservés.</div>
        </footer>
    );
}
