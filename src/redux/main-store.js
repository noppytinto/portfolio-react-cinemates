import {configureStore} from '@reduxjs/toolkit';
import currentPageSlice from './slices/curent-page-slice';


const mainStore = configureStore({
    reducer: {
        currentPageSlice: currentPageSlice.reducer
    }
});

export default mainStore;