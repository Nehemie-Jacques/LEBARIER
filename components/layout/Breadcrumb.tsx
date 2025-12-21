import React from 'react';

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
    return (
        <nav className="breadcrumb text-sm text-gray-600">
            {items.map((it, idx) => (
                <span key={idx} className="breadcrumb-item">
                    {it.href ? <a href={it.href}>{it.label}</a> : <span>{it.label}</span>}
                    {idx < items.length - 1 && <span className="mx-2">/</span>}
                </span>
            ))}
        </nav>
    );
}
