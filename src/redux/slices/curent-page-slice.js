import {createSlice} from '@reduxjs/toolkit';

const EXPLORE_PAGE_KEY = 'explore';
// const HOME_PAGE_KEY = 'home';
// const SEARCH_PAGE_KEY = 'search';

const initialState = {
    currentPage: EXPLORE_PAGE_KEY,
};

const currentPageSlice = createSlice({
    name: 'currentPageSlice',
    initialState,
    reducers: {
        setPage(state, action) {
            state.currentPage = action.payload.page;
        },
    },
});


export default currentPageSlice;

// export actions
export const currentPageActions = currentPageSlice.actions;