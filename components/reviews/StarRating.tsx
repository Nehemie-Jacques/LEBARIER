import React from 'react';

export default function StarRating({ rating = 0 }: { rating?: number }) {
    return <div className="star-rating">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</div>;
}
