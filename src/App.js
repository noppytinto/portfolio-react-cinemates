import * as authService from './services/auth-service';
import React, {useEffect, Suspense} from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.scss';
import * as assets from './utils/assets-manager';
import { AnimatePresence } from 'framer-motion';
import {useDispatch} from "react-redux";
import {authActions} from './redux/slices/auth-slice'


const WithMainHeader =      React.lazy(() => import('./components/reusable/WithMainHeader/WithMainHeader'));
const WithoutMainHeader =   React.lazy(() => import('./components/reusable/WithoutMainHeader/WithoutMainHeader'));
// pages
const ExplorePage =         React.lazy(() => import('./components/pages/ExplorePage/ExplorePage'));
const FeedsPage =           React.lazy(() => import('./components/pages/FeedsPage/FeedsPage'));
const SearchPage =          React.lazy(() => import('./components/pages/SearchPage/SearchPage'));
const NotificationPage =    React.lazy(() => import('./components/pages/NotificationPage/NotificationPage'));
const ProfilePage =         React.lazy(() => import('./components/pages/ProfilePage/ProfilePage'));
const PlaygroundPage =      React.lazy(() => import('./components/pages/PlaygroundPage/PlaygroundPage'));
const Error404Page =        React.lazy(() => import('./components/pages/Error404Page/Error404Page'));
const MoviePage =           React.lazy(() => import('./components/pages/MoviePage/MoviePage'));
const ExplorePageList =     React.lazy(() => import('./components/reusable/ExplorePageList/ExplorePageList'));
const SignUpPage =          React.lazy(() => import('./components/pages/SignUpPage/SignUpPage'));
const LoginPage =           React.lazy(() => import('./components/pages/LoginPage/LoginPage'));
const MoviesListPage =      React.lazy(() => import("./components/pages/MoviesListPage/MoviesListPage"));


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
                <Suspense fallback={<p>loading...</p>}>
                    <Routes location={location} key={location.pathname}>
                        <Route path={assets.pathRoot} element={<WithMainHeader />}>
                            <Route index element={ <ExplorePage  variants={fadeInVariants}/> } />
                            <Route path={assets.pathExplorePage} element={ <ExplorePage variants={fadeInVariants}/> } />
                            <Route path={assets.pathFeedsPage} element={  <FeedsPage variants={fadeInVariants}/> } />
                            <Route path={assets.pathSearchPage} element={ <SearchPage variants={fadeInVariants}/> } />

                            <Route path={assets.pathPlayground} element={ <PlaygroundPage />} />
                            <Route path={assets.pathTest} element={  <Navigate to={assets.pathPlayground} /> } />
                            <Route path={assets.pathAny} element={ <Error404Page variants={fadeInVariants}/> } />
                        </Route>

                        <Route path={assets.pathRoot} element={<WithoutMainHeader />}>
                            <Route path={assets.pathNotificationPage} element={ <NotificationPage variants={fadeInVariants}/>} />
                            <Route path={assets.pathMovieInfoPageWithId} element={ <MoviePage variants={fadeInVariants}/>} />
                            <Route path={assets.pathSinUpPage} element={ <SignUpPage variants={fadeInVariants}/>} />
                            <Route path={assets.pathLoginPage} element={ <LoginPage variants={fadeInVariants}/>} />
                            <Route path={assets.pathProfilePage} element={ <ProfilePage variants={fadeInVariants}/>} />
                            <Route path={assets.pathExploreList} element={ <ExplorePageList variants={fadeInVariants}/>} />
                            <Route path={assets.pathMoviesListPage} element={ <MoviesListPage variants={fadeInVariants}/>} />
                        </Route>
                    </Routes>
                </Suspense>
            </AnimatePresence>
        </div>
    );
}

export default App;
