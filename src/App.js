import * as authService from './services/auth-service';
import React, {useEffect} from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.scss';
import * as assets from './utils/assets-manager';
import { AnimatePresence } from 'framer-motion';
import {useDispatch} from "react-redux";
import {authActions} from './redux/slices/auth-slice'
// import {pathMoviesListPage} from "./utils/assets-manager";

import WithMainHeader from './components/reusable/WithMainHeader/WithMainHeader';
import WithoutMainHeader from './components/reusable/WithoutMainHeader/WithoutMainHeader';
// pages
import ExplorePage from "./components/pages/ExplorePage/ExplorePage";
import FeedsPage from './components/pages/FeedsPage/FeedsPage';
import SearchPage from "./components/pages/SearchPage/SearchPage";
import NotificationPage from './components/pages/NotificationPage/NotificationPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import PlaygroundPage from './components/pages/PlaygroundPage/PlaygroundPage';
import Error404Page from './components/pages/Error404Page/Error404Page';
import MoviePage from "./components/pages/MoviePage/MoviePage";
import ExplorePageList from './components/reusable/ExplorePageList/ExplorePageList';
import SignUpPage from "./components/pages/SignUpPage/SignUpPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import MoviesListPage from "./components/pages/MoviesListPage/MoviesListPage";


//
const duration = 0.15;
const ease = "easeIn";
const fadeInVariants = {
    hidden: {opacity: 0, transition:{duration, ease}},
    visible: {opacity: 1, transition:{duration, ease}},
}

let userIsAlreadyLoggedIn = true;
console.log('app started');

function App() {
    console.log('App rendered');
    const location = useLocation();
    const dispatcher = useDispatch();

    // check persisted login status
    useEffect(() => {
        if ( ! userIsAlreadyLoggedIn) return;

        const unsubscribe = authService.listenAuthStateChanges(async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log('USER SIGNED IN: ', uid);

                dispatcher(authActions.setIsLogged({isLogged: true}));
                const userData = await authService.getUserData(user.uid);
                userData.firebaseId = user.uid;
                dispatcher(authActions.setUserData({userData}));
                // ...
            } else {
                // User is signed out
                // ...
                console.log('USER SIGNED OUT');
                // dispatcher(authActions.setIsLogged({isLogged: false}));
                // dispatcher(authActions.setUserData({}));
            }
        })

        userIsAlreadyLoggedIn = false;

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className={'App'}>
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path={assets.pathRoot} element={<WithMainHeader />}>
                        <Route index element={<ExplorePage  variants={fadeInVariants}/>} />
                        <Route path={assets.pathExplorePage} element={<ExplorePage variants={fadeInVariants}/>} />
                        <Route path={assets.pathFeedsPage} element={ <FeedsPage variants={fadeInVariants}/> } />
                        <Route path={assets.pathSearchPage} element={<SearchPage variants={fadeInVariants}/>} />

                        <Route path={assets.pathPlayground} element={<PlaygroundPage />} />
                        <Route path={assets.pathTest} element={ <Navigate to={assets.pathPlayground} /> } />
                        <Route path={assets.pathAny} element={<Error404Page variants={fadeInVariants}/>} />
                    </Route>

                    <Route path={assets.pathRoot} element={<WithoutMainHeader />}>
                        <Route path={assets.pathNotificationPage} element={<NotificationPage variants={fadeInVariants}/>} />
                        <Route path={assets.pathMovieInfoPageWithId} element={<MoviePage variants={fadeInVariants}/>} />
                        <Route path={assets.pathSinUpPage} element={<SignUpPage variants={fadeInVariants}/>} />
                        <Route path={assets.pathLoginPage} element={<LoginPage variants={fadeInVariants}/>} />
                        <Route path={assets.pathProfilePage} element={<ProfilePage variants={fadeInVariants}/>} />
                        <Route path={assets.pathExploreList} element={<ExplorePageList variants={fadeInVariants}/>} />
                        <Route path={assets.pathMoviesListPage} element={<MoviesListPage variants={fadeInVariants}/>} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
