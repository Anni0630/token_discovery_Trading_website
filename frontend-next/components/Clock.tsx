'use client';

import { useState, useEffect } from 'react';

export function Clock() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        // Initial set
        const updateTime = () => {
            const now = new Date();
            // Format: HH:MM:SS UTC (Standard for trading)
            setTime(now.toISOString().split('T')[1].split('.')[0] + ' UTC');
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return <div className="w-20 h-4 bg-white/5 animate-pulse rounded"></div>;

    return (
        <div className="font-mono text-xs text-gray-400 border border-white/5 bg-surface px-3 py-1 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
            {time}
        </div>
    );
}
