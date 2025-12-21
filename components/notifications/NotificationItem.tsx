import React from 'react';

export default function NotificationItem({ title, message }: { title?: string; message?: string }) {
    return (
        <div className="notification-item p-2 border-b">
            {title && <div className="font-bold">{title}</div>}
            {message && <div className="text-sm">{message}</div>}
        </div>
    );
}
