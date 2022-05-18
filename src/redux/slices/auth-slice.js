import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    userData: {},
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setIsLogged(state, action) {
            state.isLogged = action.payload.isLogged;
        },

        setUserData(state, action) {
            state.userData = action.payload.userData;
        },
    },
});


export default authSlice;

// export actions
export const authActions = authSlice.actions;