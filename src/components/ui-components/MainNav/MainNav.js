import styles from './MainNav.module.scss';
import * as assets from '../../../utils/assets-manager';
import {NavLink, useLocation} from 'react-router-dom';


function MainNav() {
    const location = useLocation();
    const currentPath = location.pathname;

    let movieLinkStyle = `${styles['main-nav__link']}`;
    let homeLinkStyle = `${styles['main-nav__link']}`;
    let searchLinkStyle = `${styles['main-nav__link']}`;

    let movieIconStyle = `${styles['main-nav__icon']}`;
    let homeIconStyle = `${styles['main-nav__icon']}`;
    let searchIconStyle = `${styles['main-nav__icon']}`;

    switch (currentPath) {
        case assets.pathExplorePage:
            movieLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            movieIconStyle = `${styles['main-nav__icon']} ${styles['main-nav__icon--active']}`;
            break;
        case assets.pathFeedsPage:
            homeLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            homeIconStyle = `${styles['main-nav__icon']} ${styles['main-nav__icon--active']}`;
            break;
        case assets.pathSearchPage:
            searchLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            searchIconStyle = `${styles['main-nav__icon']} ${styles['main-nav__icon--active']}`;
            break;
        default:
            movieLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            movieIconStyle = `${styles['main-nav__icon']} ${styles['main-nav__icon--active']}`;
    }


    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <nav className={styles['main-nav']}>
            <ul className={`${styles['main-nav__list']}`}>
                <li className={`${styles['main-nav__item']}`}>
                    <NavLink className={movieLinkStyle}
                             to={assets.pathExplorePage}>
                        {/*<MovieIcon className={styles['main-nav__link-icon']} fill={movieIconColor} />*/}
                        <assets.IconMovie className={movieIconStyle} />
                    </NavLink>
                </li>

                <li className={`${styles['main-nav__item']}`}>
                    <NavLink className={homeLinkStyle}
                             to={assets.pathFeedsPage}>
                        <assets.IconHome className={homeIconStyle} />
                    </NavLink>
                </li>

                <li className={`${styles['main-nav__item']}`}>
                    <NavLink className={searchLinkStyle}
                             to={assets.pathSearchPage}>
                        <assets.IconSearch className={searchIconStyle} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}// MainNav


export default MainNav;