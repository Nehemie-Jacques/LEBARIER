import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
    return <div className="card p-4 bg-white shadow-sm rounded">{children}</div>;
}
