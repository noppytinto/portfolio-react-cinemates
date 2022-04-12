import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Playground from './components/Playground/Playground';
import Home from './components/Home/Home';

function App() {
    return (
        <div className={styles.App}>
            <h1>Cinemates</h1>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/playground' element={<Playground />}/>
            </Routes>
        </div>
    );
}

export default App;
