// import styles from './WithMainHeader.module.css';
import MainHeader from '../../MainHeader/MainHeader';
import { Outlet } from 'react-router-dom';

function WithMainHeader() {
    // const classes = `${styles['main-header']}`;

    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    );
}

export default WithMainHeader;