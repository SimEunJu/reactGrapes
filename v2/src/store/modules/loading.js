import { createSlice } from "@reduxjs/toolkit";

/*
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';
*/

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