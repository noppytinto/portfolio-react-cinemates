import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Playground from './components/Playground/Playground';
import Home from './components/Home/Home';
import Error404 from './components/Error404/Error404';
import React from 'react';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
    return (
        <div className={styles.App}>
            <Routes>
                <Route path='/' element={<MainHeader />}> 
                    <Route index element={<Home />} />
                    <Route path='/playground' element={<Playground />} />
                    <Route path='*' element={<Error404 />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
