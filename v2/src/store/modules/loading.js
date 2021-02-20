import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {},
    reducers: {
        startLoading: (state, action) => {
            [action.payload] = true
        },
        finishLoading: (state, action) => {
            [action.payload] = false
        }
    }
});

export const {startLoading, finishLoading} = loadingSlice.actions;

export default loadingSlice.reducer;