import React from 'react';
import styles from './MainHeader.module.scss';
import * as assets from '../../../utils/assets-manager';
import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux";
import * as cloudinaryService from '../../../services/cloudinary-service';
import { AdvancedImage } from '@cloudinary/react';


function MainHeader(props) {
    const userIsLogged = useSelector((state) => state.authSlice.isLogged);
    const userData = useSelector((state) => state.authSlice.userData);


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function showAnonymousUserButton() {
        return (
            <NavLink className={styles['main-header__link']} to={assets.pathLoginPage}>
                <div className={`${styles['main-header__icon-container']}`}>
                    <assets.IconPerson className={`${styles['main-header__icon']}`}/>

                </div>
            </NavLink>
        );
    }

    function showLoggedUserButton() {
        const userImage = cloudinaryService.getTransformedImage(userData.imageId);

        return (
            <NavLink className={styles['main-header__link']} to={assets.pathProfilePage}>
                <div className={`${styles['main-header__icon-container']}`}>
                    <AdvancedImage className={`${styles['main-header__icon']} ${styles['main-header__icon-profile']}`}
                                   cldImg={userImage}
                                   alt={assets.stringAltUserProfile}/>
                </div>
            </NavLink>
        );
    }


    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <div className={styles['main-header']}>
            <NavLink className={styles['main-header__logo-link']} to={assets.pathRoot}>
                <img className={styles['main-header__logo-image']}
                     src={assets.imageExtendedLogoNoLights}
                     alt={assets.stringAltCinematesLogo}/>
            </NavLink>

            <nav className={styles['main-header__nav']}>
                {userIsLogged ? showLoggedUserButton() : showAnonymousUserButton()}
            </nav>
        </div>
    );
    
}// MainHeader

export default MainHeader;