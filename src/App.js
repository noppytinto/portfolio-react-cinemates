import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import Playground from './components/Playground/Playground';
import Home from './components/Home/Home';
import Error404 from './components/Error404/Error404';
import Notification from './components/Notification/Notification';
import Profile from './components/Profile/Profile';
import WithMainHeader from './components/reusable/WithMainHeader/WithMainHeader';
import WithoutMainHeader from './components/reusable/WithoutMainHeader/WithoutMainHeader';

function App() {
    return (
        <div className={styles.App}>
            <Routes>
                <Route path='/' element={<WithMainHeader />}> 
                    <Route index element={<Home />} />
                    <Route path="/home" element={ <Navigate to="/" /> } />
                    <Route path='/playground' element={<Playground />} />
                    <Route path="/test" element={ <Navigate to="/playground" /> } />
                    <Route path='*' element={<Error404 />} />
                </Route>

                <Route path='/' element={<WithoutMainHeader />}>
                    <Route path='/notification' element={<Notification />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;