const tokens = [
    { symbol: 'BTC', name: 'Bitcoin', price: 65000, change: 2.5, volume: 1000000, type: 'migrated' },
    { symbol: 'ETH', name: 'Ethereum', price: 3500, change: 1.2, volume: 500000, type: 'migrated' },
    { symbol: 'SOL', name: 'Solana', price: 145, change: 5.8, volume: 300000, type: 'migrated' },
    { symbol: 'PEPE', name: 'Pepe', price: 0.000002, change: 15.0, volume: 100000, type: 'new' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.12, change: -1.5, volume: 200000, type: 'migrated' },
    { symbol: 'WIF', name: 'dogwifhat', price: 2.5, change: 10.5, volume: 150000, type: 'final' },
    { symbol: 'BONK', name: 'Bonk', price: 0.000025, change: 8.0, volume: 80000, type: 'final' },
    { symbol: 'FLOKI', name: 'Floki', price: 0.00015, change: 3.2, volume: 60000, type: 'migrated' },
    { symbol: 'SHIB', name: 'Shiba Inu', price: 0.000028, change: 0.5, volume: 400000, type: 'migrated' },
    { symbol: 'SUI', name: 'Sui', price: 1.8, change: -2.0, volume: 90000, type: 'migrated' }
];

function generateMockUpdates() {
    return tokens.map(token => {
        const volatility = 0.02; // 2% max change
        const changePercent = (Math.random() - 0.5) * volatility;
        token.price = token.price * (1 + changePercent);
        token.change = token.change + (changePercent * 100);
        // Keep volume relatively stable
        token.volume = token.volume * (1 + (Math.random() - 0.5) * 0.01);
        return { ...token };
    });
}

module.exports = { tokens, generateMockUpdates };
