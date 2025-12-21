import React from 'react';

export default function Pagination({ page = 1, total = 1 }: { page?: number; total?: number }) {
    return (
        <div className="pagination flex items-center gap-2">
            <button disabled={page <= 1} className="px-2">Prev</button>
            <span>
                Page {page} / {total}
            </span>
            <button disabled={page >= total} className="px-2">Next</button>
        </div>
    );
}
