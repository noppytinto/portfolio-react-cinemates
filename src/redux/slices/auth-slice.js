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
            const listKey = action.payload.listKey;
            const oldLists = state.userData.lists ?? {};
            const newLists = {
                ...oldLists,
                [listKey]: updatedList,
            };
            state.userData.lists = newLists;
        },

        updateProfilePicture(state, action) {
            state.userData.imageId = action.imageId;
        }
    },
});


export default authSlice;

// export actions
export const authActions = authSlice.actions;