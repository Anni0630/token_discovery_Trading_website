import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Token = {
    symbol: string;
    name: string;
    price: number;
    change: number;
    volume: number;
    type: 'new' | 'final' | 'migrated';
};

export type SortKey = 'price' | 'liquidity' | 'volume' | 'txns' | 'age' | 'marketCap' | null;
export type SortDirection = 'asc' | 'desc';

export type TimeRange = '5m' | '10m' | '15m' | '1h' | '4h' | '1d' | '1w' | '1m';

interface TokensState {
    data: Token[];
    activeTab: string;
    searchQuery: string;
    isLoading: boolean;
    sortKey: SortKey;
    sortDir: SortDirection;
    timeRange: TimeRange;
}

const initialState: TokensState = {
    data: [],
    activeTab: 'migrated',
    searchQuery: '',
    isLoading: true,
    sortKey: 'volume',
    sortDir: 'desc',
    timeRange: '1h',
};

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Token[]>) => {
            state.data = action.payload;
            state.isLoading = false;
        },
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSorting: (state, action: PayloadAction<{ key: SortKey; dir: SortDirection }>) => {
            state.sortKey = action.payload.key;
            state.sortDir = action.payload.dir;
        },
        toggleSort: (state, action: PayloadAction<SortKey>) => {
            if (state.sortKey === action.payload) {
                state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortKey = action.payload;
                state.sortDir = 'desc';
            }
        },
        setTimeRange: (state, action: PayloadAction<TimeRange>) => {
            state.timeRange = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setTokens, setActiveTab, setSearchQuery, setSorting, toggleSort, setTimeRange, setIsLoading } = tokensSlice.actions;

export default tokensSlice.reducer;
