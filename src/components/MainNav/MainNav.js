import styles from './MainNav.module.css';
import * as assetsManager from '../../utils/AssetsManager';
import { NavLink } from 'react-router-dom';
import { ReactComponent as MovieIcon } from '../reusable/Icons/theaters_white_24dp.svg';
import { ReactComponent as HomeIcon } from '../reusable/Icons/home_white_24dp.svg';
import { ReactComponent as SearchIcon } from '../reusable/Icons/search_white_24dp.svg';
import { useSelector, useDispatch } from 'react-redux';
import {currentPageActions} from '../../redux/slices/curent-page-slice';

function MainNav() {
    let explorePageActive = true;
    let homePageActive = false;
    let searchPageActive = false;

    const currentPage = useSelector((state) => state.currentPageSlice.currentPage);
    const dispatcher = useDispatch();

    switch (currentPage) {
        case 'explore':
            explorePageActive = true;
            homePageActive = false;
            searchPageActive = false;
            break;
        case 'home':
            explorePageActive = false;
            homePageActive = true;
            searchPageActive = false;
            break;
        case 'search':
            explorePageActive = false;
            homePageActive = false;
            searchPageActive = true;
            break;
        default:
            explorePageActive = true;
            homePageActive = false;
            searchPageActive = false;
    }



    let movieIconColor = explorePageActive ? assetsManager.colorPrimaryYellow : assetsManager.colorPrimaryLightBlue;
    let homeIconColor = homePageActive ? assetsManager.colorPrimaryYellow : assetsManager.colorPrimaryLightBlue;
    let searchIconColor = searchPageActive ? assetsManager.colorPrimaryYellow : assetsManager.colorPrimaryLightBlue;

    let movieLinkStyle = explorePageActive ?
        `${styles['main-nav__link']} ${styles['main-nav__link--active']}` :
        `${styles['main-nav__link']}`;

    let homeLinkStyle = homePageActive ?
        `${styles['main-nav__link']} ${styles['main-nav__link--active']}` :
        `${styles['main-nav__link']}`;

    let searchLinkStyle = searchPageActive ?
        `${styles['main-nav__link']} ${styles['main-nav__link--active']}` :
        `${styles['main-nav__link']}`;



    function onClickExploreHandler(ev) {
        console.log();
        dispatcher(currentPageActions.setPage({page: 'explore'}));
    }

    function onClickHomeHandler(ev) {
        dispatcher(currentPageActions.setPage({page: 'home'}));
    }

    function onClickSearchHandler(ev) {
        dispatcher(currentPageActions.setPage({page: 'search'}));
    }

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <nav className={styles['main-nav']}>

            <NavLink className={movieLinkStyle} to={'/explore'} onClick={onClickExploreHandler}>
                <MovieIcon fill={movieIconColor} />
            </NavLink>

            <NavLink className={homeLinkStyle} to={'/home'} onClick={onClickHomeHandler}>
                <HomeIcon fill={homeIconColor}/>
            </NavLink>

            <NavLink className={searchLinkStyle} to={'/search'} onClick={onClickSearchHandler}>
                <SearchIcon fill={searchIconColor}/>
            </NavLink>
        </nav>
    );
}

export default MainNav;