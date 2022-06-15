import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    userData: {},
    test: false,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        changeState(state, action) {
            console.log('changing state');
            state.test = action.payload;
        },
        setIsLogged(state, action) {
            state.isLogged = action.payload.isLogged;
        },

        setUserData(state, action) {
            state.userData = action.payload.userData;
        },

        setUserLists(state, action) {
            state.userData.lists = action.payload.lists;
        },

        updateUserList(state, action) {
            const updatedList = action.payload.updatedList;
            const listName = action.payload.listName;
            const oldLists = state.userData.lists;
            const newLists = {
                ...oldLists,
                [listName]: updatedList,
            };
            state.userData.lists = newLists;
        }
    },
});


export default authSlice;

// export actions
export const authActions = authSlice.actions;