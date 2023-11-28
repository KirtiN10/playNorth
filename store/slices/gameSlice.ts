import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

export const gameApi = createAsyncThunk(
    'games/fetchGamesApi',
    async ({ search, category }: { search?: string, category?: string }) => {

        const params = new URLSearchParams();
        // conditions for category or search filter
        if (category) {
            params.append("gameCategories", category)
        }
        if (search) {
            params.append("search", search)
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/tiles?${params.toString()}`)
            const catData = await res.json();
            return catData;
        } catch (error) {
            console.log("error", error)
        }
    }
);

interface SliceInterface {
    categories: [],
    games: {
        count: 0,
        items: GameItem[]
    },
    isLoading: boolean
}

const defaultValue: SliceInterface = {
    categories: [],
    games: {
        count: 0,
        items: []
    },
    isLoading: false
}

const gameSlice = createSlice({
    name: "game",
    initialState: defaultValue,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(gameApi.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(gameApi.fulfilled, (state, action) => {
            state.games = action.payload;
            state.isLoading = false;
        });
    },
});

export const gameState = (state: RootState) => state.game;

export default gameSlice.reducer;
