import { Token } from './features/tokens/tokensSlice';

export const MOCK_TOKENS: Token[] = [
    {
        symbol: "SOL",
        name: "Solana",
        price: 145.23,
        change: 5.4,
        volume: 850000000,
        type: "migrated"
    },
    {
        symbol: "BONK",
        name: "Bonk",
        price: 0.0000234,
        change: -2.1,
        volume: 45000000,
        type: "migrated"
    },
    {
        symbol: "WIF",
        name: "dogwifhat",
        price: 2.45,
        change: 12.8,
        volume: 120000000,
        type: "migrated"
    },
    {
        symbol: "JUP",
        name: "Jupiter",
        price: 1.12,
        change: 0.5,
        volume: 65000000,
        type: "migrated"
    },
    {
        symbol: "RENDER",
        name: "Render",
        price: 7.85,
        change: 8.2,
        volume: 95000000,
        type: "migrated"
    },
    {
        symbol: "PYTH",
        name: "Pyth Network",
        price: 0.45,
        change: -1.2,
        volume: 35000000,
        type: "migrated"
    },
    {
        symbol: "RAY",
        name: "Raydium",
        price: 1.85,
        change: 3.4,
        volume: 25000000,
        type: "migrated"
    },
    {
        symbol: "HNT",
        name: "Helium",
        price: 6.20,
        change: -0.8,
        volume: 15000000,
        type: "migrated"
    },
    {
        symbol: "ORCA",
        name: "Orca",
        price: 3.40,
        change: 1.1,
        volume: 8000000,
        type: "migrated"
    },
    {
        symbol: "JTO",
        name: "Jito",
        price: 3.80,
        change: 6.7,
        volume: 55000000,
        type: "migrated"
    },
    {
        symbol: "PEPE",
        name: "Pepe",
        price: 0.0000078,
        change: -5.4,
        volume: 320000000,
        type: "migrated"
    },
    {
        symbol: "DOGE",
        name: "Dogecoin",
        price: 0.16,
        change: 2.1,
        volume: 980000000,
        type: "migrated"
    },
    // New Pairs
    {
        symbol: "NEO",
        name: "Neo Token",
        price: 0.00045,
        change: 15.2,
        volume: 125000,
        type: "new"
    },
    {
        symbol: "FROGE",
        name: "Froge",
        price: 0.0000012,
        change: -3.5,
        volume: 85000,
        type: "new"
    },
    {
        symbol: "MOON",
        name: "MoonShot",
        price: 0.0023,
        change: 45.8,
        volume: 450000,
        type: "new"
    },
    // Final Stretch
    {
        symbol: "GLOW",
        name: "Glow Token",
        price: 0.012,
        change: 2.4,
        volume: 2500000,
        type: "final"
    },
    {
        symbol: "SPARK",
        name: "Spark Protocol",
        price: 0.45,
        change: 8.9,
        volume: 1800000,
        type: "final"
    },
    {
        symbol: "ZEN",
        name: "Zenith",
        price: 1.25,
        change: -1.2,
        volume: 3200000,
        type: "final"
    }
];
