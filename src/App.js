import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.scss';
import * as assets from './utils/assets-manager';
import * as authService from './services/auth-service';

// pages
import ExplorePage from "./components/pages/ExplorePage/ExplorePage";
import FeedsPage from './components/pages/FeedsPage/FeedsPage';
import SearchPage from "./components/pages/SearchPage/SearchPage";
import NotificationPage from './components/pages/NotificationPage/NotificationPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import PlaygroundPage from './components/pages/PlaygroundPage/PlaygroundPage';
import Error404Page from './components/pages/Error404Page/Error404Page';
import MoviePage from "./components/pages/MoviePage/MoviePage";

//
import WithMainHeader from './components/reusable/WithMainHeader/WithMainHeader';
import WithoutMainHeader from './components/reusable/WithoutMainHeader/WithoutMainHeader';
import ExplorePageList from './components/reusable/ExplorePageList/ExplorePageList';
import SignUpPage from "./components/pages/SignUpPage/SignUpPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import {useDispatch} from "react-redux";
import {authActions} from './redux/slices/auth-slice'
import { AnimatePresence } from 'framer-motion';

//
const variants = {
    hidden: {opacity: 0, transition:{duration: 0.2 }},
    visible: {opacity: 1, transition:{duration: 0.2 }},
}

// init backend
authService.init();

function App() {
    const dispatcher = useDispatch();

    authService.listenAuthStateChanges(async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log('USER SIGNED IN: ', uid);

            dispatcher(authActions.setIsLogged({isLogged: true}));
            const userData = await authService.getUserData(user.uid);
            dispatcher(authActions.setUserData({userData}));
            // ...
        } else {
            // User is signed out
            // ...
            console.log('USER SIGNED OUT');
            dispatcher(authActions.setIsLogged({isLogged: false}));
            dispatcher(authActions.setUserData({}));

        }
    })

    const location = useLocation();

    return (
        <div className={'App'}>
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path={assets.pathRoot} element={<WithMainHeader />}>
                        <Route index element={<ExplorePage  variants={variants}/>} />
                        <Route path={assets.pathExplorePage} element={<ExplorePage variants={variants}/>} />
                        <Route path={assets.pathFeedsPage} element={ <FeedsPage variants={variants}/> } />
                        <Route path={assets.pathSearchPage} element={<SearchPage variants={variants}/>} />

                        <Route path={assets.pathPlayground} element={<PlaygroundPage />} />
                        <Route path={assets.pathTest} element={ <Navigate to={assets.pathPlayground} /> } />
                        <Route path={assets.pathAny} element={<Error404Page variants={variants}/>} />
                    </Route>

                    <Route path={assets.pathRoot} element={<WithoutMainHeader />}>
                        <Route path={assets.pathNotificationPage} element={<NotificationPage variants={variants}/>} />
                        <Route path={assets.pathMovieInfoPageWithId} element={<MoviePage variants={variants}/>} />
                        <Route path={assets.pathSinUpPage} element={<SignUpPage variants={variants}/>} />
                        <Route path={assets.pathLoginPage} element={<LoginPage variants={variants}/>} />
                        <Route path={assets.pathProfilePage} element={<ProfilePage variants={variants}/>} />
                        <Route path={assets.pathExploreList} element={<ExplorePageList variants={variants}/>} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
