import styles from './MainHeader.module.css';
import * as assetsManager from '../../utils/AssetsManager';
import { NavLink } from 'react-router-dom';

function MainHeader() {

    return (
        <header className={styles['main-header']}>
            <NavLink className={styles['home-link']} to={'/'}>
                <img className={styles['logo']} src={assetsManager.extendedLogoNoLights} alt={''}/>
            </NavLink>

            <nav className={styles['nav']}>
                <NavLink className={styles['link']} to={'/notification'}>
                    <img className={styles['notification-icon']}
                        src={assetsManager.notificationNoneIcon} alt={''}/>
                </NavLink>
                <NavLink className={styles['link']} to={'/profile'}>
                    <img className={styles['profile-icon']}
                        src={assetsManager.profilePictureTest} alt={''}/>
                </NavLink>
            </nav>

        </header>
    );
}

export default MainHeader;