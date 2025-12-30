'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setTokens, setActiveTab, setSearchQuery, toggleSort, setTimeRange, setIsLoading, type Token as ReduxToken } from '@/lib/features/tokens/tokensSlice';
import { MOCK_TOKENS } from '@/lib/mockData';
import {
    ArrowUp, ArrowDown, Search, Star, Globe, MessageCircle,
    Shield, Lock, Users, AlertCircle, ArrowUpDown, LogOut, ChevronDown
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TableSkeleton } from '@/components/TableSkeleton';

import { Sparkline } from '@/components/Sparkline';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Clock } from '@/components/Clock';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Token = {
    symbol: string;
    name: string;
    price: number;
    change: number;
    volume: number;
    type: 'new' | 'final' | 'migrated';
};

const TABS = [
    { id: 'new', label: 'New Pairs' },
    { id: 'final', label: 'Final Stretch' },
    { id: 'migrated', label: 'Migrated' },
];

type SortKey = 'price' | 'liquidity' | 'volume' | 'txns' | 'age' | 'marketCap' | null;
type SortDirection = 'asc' | 'desc';

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession();

    // Redux Hooks
    const dispatch = useAppDispatch();
    const { data: tokens, activeTab, searchQuery, isLoading, sortKey, sortDir, timeRange } = useAppSelector((state) => state.tokens);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const timeRanges = ['5m', '10m', '15m', '1h', '4h', '1d', '1w', '1m'];

    // Simulate fetching new data when time range changes
    useEffect(() => {
        // Trigger loading state
        dispatch(setIsLoading(true));

        // Wait 800ms to simulate network request
        const timer = setTimeout(() => {
            dispatch(setIsLoading(false));
        }, 800);

        return () => clearTimeout(timer);
    }, [timeRange, dispatch]);

    // Sort Handler
    const handleSort = (key: SortKey) => {
        dispatch(toggleSort(key));
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };

    // WebSocket connection
    useEffect(() => {
        // 1. Initial Load: Set mock data immediately so Vercel deployment is never empty
        dispatch(setTokens(MOCK_TOKENS));

        // 2. Try to connect to local WS
        const ws = new WebSocket('ws://localhost:3001');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'init' || message.type === 'update') {
                    dispatch(setTokens(message.data));
                }
            } catch (e) {
                console.error('WS Error:', e);
            }
        };

        ws.onerror = () => {
            console.log('Running in generic mode (No WebSocket found)');
            // We keep the mock tokens we already set
        }

        return () => ws.close();
    }, [dispatch]);

    // Helper to get value for sorting (mirroring the mock logic in TokenRow)
    const getTokenValue = (token: Token, key: SortKey) => {
        switch (key) {
            case 'price': return token.price;
            case 'volume': return token.volume;
            case 'liquidity': return token.volume * 0.4; // Mock logic
            case 'marketCap': return token.price * 10000000; // Mock logic
            case 'txns': return token.volume / 1000; // Mock logic (buys)
            default: return 0;
        }
    };

    const filteredAndSortedTokens = useMemo(() => {
        let result = tokens.filter(t =>
            t.type === activeTab &&
            (t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (sortKey) {
            result.sort((a, b) => {
                const valA = getTokenValue(a, sortKey);
                const valB = getTokenValue(b, sortKey);
                return sortDir === 'asc' ? valA - valB : valB - valA;
            });
        }
        return result;
    }, [tokens, activeTab, searchQuery, sortKey, sortDir]);

    // Header Helper Component
    const SortableHeader = ({ label, sKey, align = 'right' }: { label: string, sKey: SortKey, align?: 'left' | 'right' | 'center' }) => (
        <th
            className={cn("p-5 font-bold tracking-wider cursor-pointer hover:text-white transition-colors select-none group",
                align === 'right' && "text-right",
                align === 'center' && "text-center",
                align === 'left' && "text-left"
            )}
            onClick={() => handleSort(sKey)}
        >
            <div className={cn("flex items-center gap-1",
                align === 'right' && "justify-end",
                align === 'center' && "justify-center"
            )}>
                {label}
                <div className="flex flex-col text-gray-600 group-hover:text-primary/50">
                    {sortKey === sKey ? (
                        sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-primary" /> : <ArrowDown className="w-3 h-3 text-primary" />
                    ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-50" />
                    )}
                </div>
            </div>
        </th>
    );

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors p-6 font-sans">
            <div className="max-w-[1600px] mx-auto space-y-6">
                {/* ... header ... */}
                <header className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="font-bold text-white text-lg">A</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Token Discovery
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Clock />
                        <div className="flex items-center gap-2 text-xs font-mono bg-surface rounded-full px-3 py-1 border border-white/5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            SOL: $145.20
                        </div>
                        <ThemeToggle />
                        <ConnectButton showBalance={false} />
                        <button
                            onClick={handleLogout}
                            className="bg-surface hover:bg-white/10 text-gray-400 hover:text-white p-2 rounded-lg transition-all"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="w-full">
                    {/* Tabs & Search */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        {/* ... Tabs ... */}
                        <div className="flex items-center gap-1 bg-surface/50 p-1 rounded-xl border border-white/5">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => dispatch(setActiveTab(tab.id))}
                                    className={cn(
                                        "px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                                        activeTab === tab.id
                                            ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by token or address..."
                                value={searchQuery}
                                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                className="w-full bg-surface/50 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white placeholder:text-gray-600 transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-sm shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-gray-500 uppercase border-b border-white/5 bg-table-header/50">
                                        <th className="p-5 font-bold tracking-wider w-80">Pair Info</th>
                                        <th className="p-5 font-bold tracking-wider w-40 relative">
                                            <div
                                                className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
                                                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                            >
                                                Chart ({timeRange})
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                            {isTimeDropdownOpen && (
                                                <div className="absolute top-full left-0 mt-2 w-24 bg-surface border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 py-1">
                                                    {timeRanges.map((range) => (
                                                        <button
                                                            key={range}
                                                            className={cn(
                                                                "w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors",
                                                                timeRange === range ? "text-primary font-bold" : "text-gray-400"
                                                            )}
                                                            onClick={() => {
                                                                dispatch(setTimeRange(range as any));
                                                                setIsTimeDropdownOpen(false);
                                                            }}
                                                        >
                                                            {range}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </th>
                                        <SortableHeader label="Price" sKey="price" />
                                        <SortableHeader label="Liquidity" sKey="liquidity" />
                                        <SortableHeader label="Volume" sKey="volume" />
                                        <SortableHeader label="MCap" sKey="marketCap" />
                                        <SortableHeader label="TXNS" sKey="txns" align="center" />
                                        <th className="p-5 font-bold tracking-wider text-left pl-8 w-64">Token Info</th>
                                        <th className="p-5 font-bold tracking-wider text-center w-24">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {isLoading ? (
                                        <TableSkeleton />
                                    ) : filteredAndSortedTokens.length === 0 ? (
                                        <tr><td colSpan={9} className="p-12 text-center text-gray-500">No tokens found matching your search.</td></tr>
                                    ) : (
                                        filteredAndSortedTokens.map((token) => (
                                            <TokenRow key={token.symbol} token={token} timeRange={timeRange} />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}

function TokenRow({ token, timeRange }: { token: Token, timeRange: string }) {
    const isPositive = token.change >= 0;

    // Mock data for visual completeness (would ordinarily come from backend)
    const liquidity = token.volume * 0.4;
    const marketCap = token.price * 10000000;
    const buys = Math.floor(token.volume / 1000);
    const sells = Math.floor(buys * 0.8);
    const age = "5m"; // Mock age

    return (
        <tr className="group hover:bg-white/[0.02] transition-all duration-200">
            <td className="p-5">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                            {/* Replaced Image with First Letter for now */}
                            {token.symbol[0]}
                            {isPositive && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black"></div>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="font-bold text-white text-base group-hover:text-primary transition-colors">{token.symbol}</div>
                            <span className="text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">SOL</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                            <span className="text-emerald-400 font-medium">{age}</span>
                            <div className="flex gap-2 text-gray-600">
                                <Globe className="w-3 h-3 hover:text-white transition-colors cursor-pointer" />
                                <MessageCircle className="w-3 h-3 hover:text-white transition-colors cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="p-5">
                <Sparkline isPositive={isPositive} key={timeRange} timeRange={timeRange} />
            </td>
            <td className="p-5 text-right font-mono font-medium text-white">
                <div className={cn("inline-block", isPositive ? "text-emerald-400" : "text-rose-400")}>
                    ${token.price.toFixed(token.price < 0.01 ? 8 : 2)}
                </div>
            </td>
            <td className="p-5 text-right font-mono text-white">
                ${(liquidity / 1000).toFixed(1)}K
            </td>
            <td className="p-5 text-right text-white font-mono">
                ${(token.volume / 1000).toFixed(1)}K
            </td>
            <td className="p-5 text-right text-white font-mono">
                ${(marketCap / 1000000).toFixed(1)}M
            </td>
            <td className="p-5 text-center font-mono text-xs">
                <div className="flex flex-col items-center">
                    <span className="text-emerald-400">{buys}</span>
                    <div className="w-full h-[1px] bg-white/10 my-0.5"></div>
                    <span className="text-rose-400">{sells}</span>
                </div>
            </td>
            <td className="p-5 pl-8">
                <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-xs font-mono w-40">
                    <div className="flex items-center gap-1 text-rose-400">
                        <Users className="w-3 h-3" />
                        25.8%
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                        <Shield className="w-3 h-3" />
                        Safe
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                        <Lock className="w-3 h-3" />
                        100%
                    </div>
                    <div className="flex items-center gap-1 text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        Unpaid
                    </div>
                </div>
            </td>
            <td className="p-5 text-center">
                <div className="flex gap-2 justify-center">
                    <button className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95">
                        Buy
                    </button>
                    <button className="bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.2)] hover:scale-105 active:scale-95">
                        Sell
                    </button>
                </div>
            </td>
        </tr>
    )
}
