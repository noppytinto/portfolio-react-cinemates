import {createSlice} from '@reduxjs/toolkit';
// import * as assets from '../../utils/assets-manager';

const initialState = {
    previousPage: '',
};

const previousPageSlice = createSlice({
    name: 'previousPageSlice',
    initialState,
    reducers: {
        setPage(state, action) {
            state.previousPage = action.payload.page;
        },
    },
});


export default previousPageSlice;

// export actions
export const previousPageActions = previousPageSlice.actions;