import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
// pages
import ExplorePage from "./components/pages/ExplorePage/ExplorePage";
import HomePage from './components/pages/HomePage/HomePage';
import SearchPage from "./components/pages/SearchPage/SearchPage";
import NotificationPage from './components/pages/NotificationPage/NotificationPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import PlaygroundPage from './components/pages/PlaygroundPage/PlaygroundPage';
import Error404Page from './components/pages/Error404Page/Error404Page';

//
import WithMainHeader from './components/reusable/WithMainHeader/WithMainHeader';
import WithoutMainHeader from './components/reusable/WithoutMainHeader/WithoutMainHeader';
import ExplorePageList from './components/reusable/ExplorePageList/ExplorePageList';


function App() {
    return (
        <div className={'App'}>
            <Routes>
                <Route path='/' element={<WithMainHeader />}> 
                    <Route index element={<ExplorePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/home" element={ <HomePage /> } />
                    <Route path="/search" element={<SearchPage />} />

                    <Route path='/playground' element={<PlaygroundPage />} />
                    <Route path="/test" element={ <Navigate to="/playground" /> } />
                    <Route path='*' element={<Error404Page />} />
                </Route>

                <Route path='/' element={<WithoutMainHeader />}>
                    <Route path='/notification' element={<NotificationPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/explore-list' element={<ExplorePageList />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
