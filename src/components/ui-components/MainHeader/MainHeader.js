import styles from './MainHeader.module.scss';
import * as assets from '../../../utils/assets-manager';
import { NavLink } from 'react-router-dom';

function MainHeader() {

    return (
        <div className={styles['main-header']}>
            <NavLink className={styles['main-header__logo-link']} to={'/'}>
                <img className={styles['main-header__logo-image']}
                     src={assets.imageExtendedLogoNoLights}
                     alt={'cinemates logo'}/>
            </NavLink>

            <nav className={styles['main-header__nav']}>
                <NavLink className={styles['main-header__link']} to={assets.pathNotificationPage}>
                    <assets.IconNotificationNone className={styles['main-header__icon-notification']}/>
                    {/*<img className={`${styles['main-header__link-icon']} ${styles['main-header__link-icon-notification']}`}*/}
                    {/*     src={assetsManager.iconNotificationNone}*/}
                    {/*     alt={'notification icon'}/>*/}
                </NavLink>
                <NavLink className={styles['main-header__link']} to={assets.pathProfilePage}>
                    <img className={`${styles['main-header__icon']} ${styles['main-header__icon-profile']}`}
                         src={assets.imageProfilePictureTest}
                         alt={'user profile'}/>
                </NavLink>
            </nav>
        </div>
    );
}

export default MainHeader;