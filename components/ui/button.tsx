import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`btn ${variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-ghost'}`}>
            {children}
        </button>
    );
}
