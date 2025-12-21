import React from 'react';

export default function Dialog({ title, children }: { title?: string; children: React.ReactNode }) {
    return (
        <div className="dialog">
            {title && <div className="dialog-title font-bold">{title}</div>}
            <div className="dialog-body">{children}</div>
        </div>
    );
}
