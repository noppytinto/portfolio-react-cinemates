import styles from './NavButton.module.scss';
import * as assetsManager from '../../../utils/AssetsManager';
import { NavLink } from 'react-router-dom';
import {ReactComponent} from "*.svg";

function NavButton(props) {


    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <NavLink className={styles['main-nav__link']} to={'/'}>
            
        </NavLink>
    );
}

export default NavButton;