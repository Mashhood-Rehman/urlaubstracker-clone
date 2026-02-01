'use client';

import React from 'react';

interface AdminTableProps {
    children: React.ReactNode;
    minWidth?: string;
    className?: string;
}

export default function AdminTable({
    children,
    minWidth = '1000px',
    className = 'max-w-[1000px] w-full'
}: AdminTableProps) {
    return (
        <div className={`bg-(--white) rounded-lg border border-(--gray-200) overflow-x-auto ${className}`}>
            <table className="w-full text-left" style={{ minWidth }}>
                {children}
            </table>
        </div>
    );
}
