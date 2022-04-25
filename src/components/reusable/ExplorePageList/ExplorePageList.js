import styles from './ExplorePageList.module.css';
// import * as assetsManager from '../../../utils/assets-manager';
import { NavLink, useLocation } from 'react-router-dom';
import BackIcon from '../Icons/arrow_back_FILL0_wght400_GRAD0_opsz48.svg'
import MovieList from '../MovieList/MovieList';

function ExplorePageList(props) {
    let classes = `${styles['explore-page-list']} `;

    const location = useLocation();
    console.log(location);
    const listTitle = location.state?.title || '(no title)';
    const movies = location.state?.movies;


    ////////////////////////////////
    // JSX
    ////////////////////////////////
    return (
        <div className={classes}>
            <header className={styles['explore-page-list__header']}>
                <NavLink className={styles['explore-page-list__btn-back']} 
                         to={'/explore'}> 
                    <img className={styles['explore-page-list__btn-back-icon']} 
                         src={BackIcon} 
                         alt={''}/>
                </NavLink>
                <p className={styles['explore-page-list__title']}>{listTitle}</p>

            </header>
            <MovieList movies={movies} />
        </div>

    );
}

export default ExplorePageList;