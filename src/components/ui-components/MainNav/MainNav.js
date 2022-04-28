import styles from './MainNav.module.css';
import * as assets from '../../../utils/assets-manager';
import {NavLink, useLocation} from 'react-router-dom';
import { ReactComponent as MovieIcon } from '../../reusable/Icons/theaters_white_24dp.svg';
import { ReactComponent as HomeIcon } from '../../reusable/Icons/home_white_24dp.svg';
import { ReactComponent as SearchIcon } from '../../reusable/Icons/search_white_24dp.svg';


function MainNav() {
    let location = useLocation();
    let currentPath = location.pathname;
    let movieLinkStyle, homeLinkStyle, searchLinkStyle;
    let movieIconColor, homeIconColor , searchIconColor;

    switch (currentPath) {
        case assets.pathExplorePage:
            movieIconColor = assets.colorPrimaryYellow;
            homeIconColor = assets.colorPrimaryLightBlue;
            searchIconColor = assets.colorPrimaryLightBlue;

            movieLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            homeLinkStyle = `${styles['main-nav__link']}`;
            searchLinkStyle = `${styles['main-nav__link']}`;
            break;
        case assets.pathFeedsPage:
            movieIconColor = assets.colorPrimaryLightBlue;
            homeIconColor = assets.colorPrimaryYellow;
            searchIconColor = assets.colorPrimaryLightBlue;

            movieLinkStyle = `${styles['main-nav__link']}`;
            homeLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            searchLinkStyle = `${styles['main-nav__link']}`;
            break;
        case assets.pathSearchPage:
            movieIconColor = assets.colorPrimaryLightBlue;
            homeIconColor = assets.colorPrimaryLightBlue;
            searchIconColor = assets.colorPrimaryYellow;

            movieLinkStyle = `${styles['main-nav__link']}`;
            homeLinkStyle = `${styles['main-nav__link']}`;
            searchLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            break;
        default:
            movieIconColor = assets.colorPrimaryYellow;
            homeIconColor = assets.colorPrimaryLightBlue;
            searchIconColor = assets.colorPrimaryLightBlue;

            movieLinkStyle = `${styles['main-nav__link']} ${styles['main-nav__link--active']}`;
            homeLinkStyle = `${styles['main-nav__link']}`;
            searchLinkStyle = `${styles['main-nav__link']}`;
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
                        <MovieIcon className={styles['main-nav__link-icon']} fill={movieIconColor} />
                    </NavLink>
                </li>

                <li className={`${styles['main-nav__item']}`}>
                    <NavLink className={homeLinkStyle}
                             to={assets.pathFeedsPage}>
                        <HomeIcon className={styles['main-nav__link-icon']}  fill={homeIconColor}/>
                    </NavLink>
                </li>

                <li className={`${styles['main-nav__item']}`}>
                    <NavLink className={searchLinkStyle}
                             to={assets.pathSearchPage}>
                        <SearchIcon className={styles['main-nav__link-icon']}  fill={searchIconColor}/>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}// MainNav


export default MainNav;