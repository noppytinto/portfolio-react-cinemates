import styles from './WithoutMainHeader.module.css';
import MainHeader from '../../MainHeader/MainHeader';
import { Outlet } from 'react-router-dom';

function WithoutMainHeader() {
    // const classes = `${styles['main-header']}`;

    return (
        <Outlet />
    );
}

export default WithoutMainHeader;