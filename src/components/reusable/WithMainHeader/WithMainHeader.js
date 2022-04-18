// import styles from './WithMainHeader.module.css';
import MainHeader from '../../MainHeader/MainHeader';
import { Outlet } from 'react-router-dom';
import MainNav from "../../MainNav/MainNav";

function WithMainHeader() {
    // const classes = `${styles['main-header']}`;

    return (
        <>
            <MainHeader />
            <MainNav />
            <Outlet />
        </>
    );
}

export default WithMainHeader;