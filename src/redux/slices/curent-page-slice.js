import {createSlice} from '@reduxjs/toolkit';
import * as assets from '../../utils/assets-manager';

const initialState = {
    currentPage: assets.pathFeedsPage,
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