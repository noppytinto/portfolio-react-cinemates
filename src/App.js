import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import * as assets from './utils/assets-manager';
// pages
import ExplorePage from "./components/pages/ExplorePage/ExplorePage";
import HomePage from './components/pages/HomePage/HomePage';
import SearchPage from "./components/pages/SearchPage/SearchPage";
import NotificationPage from './components/pages/NotificationPage/NotificationPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import PlaygroundPage from './components/pages/PlaygroundPage/PlaygroundPage';
import Error404Page from './components/pages/Error404Page/Error404Page';
import MovieInfoPage from "./components/pages/MovieInfoPage/MovieInfoPage";

//
import WithMainHeader from './components/reusable/WithMainHeader/WithMainHeader';
import WithoutMainHeader from './components/reusable/WithoutMainHeader/WithoutMainHeader';
import ExplorePageList from './components/reusable/ExplorePageList/ExplorePageList';


function App() {
    return (
        <div className={'App'}>
            <Routes>
                <Route path={assets.pathRoot} element={<WithMainHeader />}>
                    <Route index element={<ExplorePage />} />
                    <Route path={assets.pathExplorePage} element={<ExplorePage />} />
                    <Route path={assets.pathFeedsPage} element={ <HomePage /> } />
                    <Route path={assets.pathSearchPage} element={<SearchPage />} />

                    <Route path='/playground' element={<PlaygroundPage />} />
                    <Route path="/test" element={ <Navigate to="/playground" /> } />
                    <Route path='*' element={<Error404Page />} />
                </Route>

                <Route path={assets.pathRoot} element={<WithoutMainHeader />}>
                    <Route path={assets.pathNotificationPage} element={<NotificationPage />} />
                    <Route path={assets.pathMovieInfoPageWithId} element={<MovieInfoPage />} />
                    <Route path={assets.pathProfilePage} element={<ProfilePage />} />
                    <Route path={assets.pathExploreList} element={<ExplorePageList />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
