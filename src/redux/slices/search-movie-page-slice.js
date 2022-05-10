import {createSlice} from '@reduxjs/toolkit';
// import * as assets from '../../utils/assets-manager';

const initialState = {
    hasCachedResults: false,
    cachedResults: [],
    query: '',
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
        saveQueryString(state, action) {
            console.log('saving query string: ', action.payload.query);
            state.query = action.payload.query;
        },
        resetQueryString(state, action) {
            state.query = '';
        }
    },
});


export default searchMoviePageSlice;

// export actions
export const searchMoviePageActions = searchMoviePageSlice.actions;