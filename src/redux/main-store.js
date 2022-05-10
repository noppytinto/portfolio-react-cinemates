import {configureStore} from '@reduxjs/toolkit';
import currentPageSlice from './slices/current-page-slice';
import previousPageSlice from './slices/previous-page-slice';
import searchMoviePageSlice from './slices/search-movie-page-slice';
import authSlice from './slices/auth-slice';


const mainStore = configureStore({
    reducer: {
        currentPageSlice: currentPageSlice.reducer,
        previousPageSlice: previousPageSlice.reducer,
        searchMoviePageSlice: searchMoviePageSlice.reducer,
        authSlice: authSlice.reducer,
    }
});

export default mainStore;