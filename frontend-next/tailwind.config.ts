import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                surface: 'hsl(var(--surface))',
                foreground: 'hsl(var(--foreground))',
                primary: '#38bdf8', // Light Blue (Sky 400) for accents like "Buy"
                secondary: '#818cf8', // Indigo
                accent: '#f472b6', // Pink
                positive: '#34d399', // Emerald 400
                negative: '#fb7185', // Rose 400
                'card-bg': '#121316', // Specific dark card background
                'table-header': '#1a1d21',
            },
        },
    },
    plugins: [],
};
export default config;
