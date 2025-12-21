import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string };

export default function Select({ label, children, ...props }: SelectProps) {
    return (
        <label className="select-wrapper">
            {label && <span className="select-label">{label}</span>}
            <select {...props} className={`select ${props.className ?? ''}`}>{children}</select>
        </label>
    );
}
