// import styles from './WithoutMainHeader.module.scss';
import { Outlet } from 'react-router-dom';

function WithoutMainHeader() {
    // const classes = `${styles['main-header']}`;

    return (
        <Outlet />
    );
}

export default WithoutMainHeader;