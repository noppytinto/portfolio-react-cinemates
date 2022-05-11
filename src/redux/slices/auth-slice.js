import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setIsLogged(state, action) {
            state.isLogged = action.payload.isLogged;
        },
    },
});


export default authSlice;

// export actions
export const authActions = authSlice.actions;