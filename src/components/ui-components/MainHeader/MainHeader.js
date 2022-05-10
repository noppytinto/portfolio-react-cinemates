import styles from './MainHeader.module.scss';
import * as assets from '../../../utils/assets-manager';
import { NavLink } from 'react-router-dom';
import {authActions} from '../../../redux/slices/auth-slice'
import {useDispatch, useSelector} from "react-redux";


function MainHeader() {
    const dispatcher = useDispatch();
    const userIsLogged = useSelector((state) => state.authSlice.isLogged);


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function showAnonymousUserButton() {
        return (
            <NavLink className={styles['main-header__link']} to={assets.pathProfilePage}>
                <div className={`${styles['main-header__icon-container']}`}>
                    <assets.IconPerson className={`${styles['main-header__icon']}`}/>

                </div>
            </NavLink>
        );
    }

    function showLoggedUserButton() {
        return (
            <NavLink className={styles['main-header__link']} to={assets.pathProfilePage}>
                <div className={`${styles['main-header__icon-container']}`}>
                    <img className={`${styles['main-header__icon']} ${styles['main-header__icon-profile']}`}
                         src={assets.imageProfilePictureTest}
                         alt={'user profile'}/>
                </div>
            </NavLink>
        );
    }


    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <div className={styles['main-header']}>
            <NavLink className={styles['main-header__logo-link']} to={'/'}>
                <img className={styles['main-header__logo-image']}
                     src={assets.imageExtendedLogoNoLights}
                     alt={'cinemates logo'}/>
            </NavLink>

            <nav className={styles['main-header__nav']}>
                {userIsLogged ? showLoggedUserButton() : showAnonymousUserButton()}
            </nav>
        </div>
    );
}

export default MainHeader;