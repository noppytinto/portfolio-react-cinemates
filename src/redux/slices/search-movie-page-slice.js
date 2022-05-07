import {createSlice} from '@reduxjs/toolkit';
// import * as assets from '../../utils/assets-manager';

const initialState = {
    hasCachedResults: false,
    cachedResults: [],
};

const searchMoviePageSlice = createSlice({
    name: 'currentPageSlice',
    initialState,
    reducers: {
        setHasCachedResults(state, action) {
            state.hasCachedResults = action.payload.hasCachedResults;
        },
        setCachedResults(state, action) {
            state.cachedResults = action.payload.cachedResults;
        },
        resetCachedResults(state, action) {
            state.cachedResults = [];
        },
    },
});


export default searchMoviePageSlice;

// export actions
export const searchMoviePageActions = searchMoviePageSlice.actions;