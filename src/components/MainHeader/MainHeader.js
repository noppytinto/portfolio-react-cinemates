import { Outlet } from 'react-router-dom';
import styles from './MainHeader.module.css';


function MainHeader() {
    const classes = `${styles['main-header']}`;

    return (
        <div className={classes}>
            <nav>main header</nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default MainHeader;