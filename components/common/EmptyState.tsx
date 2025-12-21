import React from 'react';

export default function EmptyState({ title, subtitle }: { title?: string; subtitle?: string }) {
    return (
        <div className="empty-state text-center py-8">
            <h3 className="text-lg font-bold">{title ?? 'Aucune donnée'}</h3>
            {subtitle && <p className="text-sm mt-2">{subtitle}</p>}
        </div>
    );
}
