import styles from './MainHeader.module.css';
import * as assetsManager from '../../../utils/assets-manager';
import { NavLink } from 'react-router-dom';

function MainHeader() {

    return (
        <header className={styles['main-header']}>
            <NavLink className={styles['main-header__logo-link']} to={'/'}>
                <img className={styles['main-header__logo-image']}
                     src={assetsManager.imageExtendedLogoNoLights}
                     alt={'cinemates logo'}/>
            </NavLink>

            <nav className={styles['main-header__nav']}>
                <NavLink className={styles['main-header__link']} to={'/notification'}>
                    <img className={`${styles['main-header__link-icon']} ${styles['main-header__link-icon-notification']}`}
                         src={assetsManager.iconNotificationNone}
                         alt={'notification icon'}/>
                </NavLink>
                <NavLink className={styles['main-header__link']} to={'/profile'}>
                    <img className={`${styles['main-header__link-icon']} ${styles['main-header__link-icon-profile']}`}
                         src={assetsManager.imageProfilePictureTest}
                         alt={'user profile'}/>
                </NavLink>
            </nav>
        </header>
    );
}

export default MainHeader;