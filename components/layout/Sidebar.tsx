import React from 'react';

export default function Sidebar({ children }: { children?: React.ReactNode }) {
    return <aside className="sidebar w-64 p-4 bg-white border-r">{children}</aside>;
}
