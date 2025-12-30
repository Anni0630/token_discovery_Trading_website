import { useMemo } from 'react';

export function Sparkline({ isPositive, data, timeRange }: { isPositive: boolean; data?: number[]; timeRange?: string }) {
    const color = isPositive ? "#34d399" : "#fb7185";

    // Generate random walking data if none provided
    const points = useMemo(() => {
        if (data) return data;

        // Adjust volatility based on timeRange
        let volatility = 20; // Default (1h)
        if (timeRange === '5m') volatility = 5;
        if (timeRange === '15m') volatility = 10;
        if (timeRange === '4h') volatility = 30;
        if (timeRange === '1d') volatility = 40;
        if (timeRange === '1w') volatility = 60;

        // Random walk generation
        const localPoints = [];
        let current = 50;
        for (let i = 0; i < 20; i++) {
            // Bias towards the trend (positive or negative)
            const bias = isPositive ? (volatility / 10) : -(volatility / 10);
            const change = (Math.random() - 0.5) * volatility + bias;
            current += change;
            // Clamp between 5 and 95
            current = Math.max(5, Math.min(95, current));
            localPoints.push(current);
        }

        // If positive, ensure end is higher than start visually for effect
        if (isPositive && localPoints[localPoints.length - 1] < localPoints[0]) {
            localPoints[localPoints.length - 1] = localPoints[0] + volatility;
        }
        // If negative, ensure end is lower
        if (!isPositive && localPoints[localPoints.length - 1] > localPoints[0]) {
            localPoints[localPoints.length - 1] = localPoints[0] - volatility;
        }

        return localPoints;
    }, [isPositive, data, timeRange]);

    // Convert points to SVG path commands
    const width = 100;
    const height = 30;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;

    // Map value to Y coordinate (inverted because SVG Y moves down)
    const getY = (val: number) => height - ((val - min) / range) * height;

    const pathData = points.map((val, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = getY(val);
        return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');

    const fillPath = `${pathData} L ${width},${height} L 0,${height} Z`;

    return (
        <svg width="100" height="40" viewBox="0 -5 100 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
            {/* Gradient Definition */}
            <defs>
                <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Area Fill */}
            <path
                d={fillPath}
                fill={`url(#gradient-${isPositive ? 'up' : 'down'})`}
                stroke="none"
            />

            {/* Line Stroke */}
            <path
                d={pathData}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}
