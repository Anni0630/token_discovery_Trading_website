'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Web3Providers } from '@/components/Web3Providers';
import StoreProvider from './StoreProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <StoreProvider>
                <Web3Providers>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                        {children}
                    </ThemeProvider>
                </Web3Providers>
            </StoreProvider>
        </SessionProvider>
    );
}
