import styles from './MoviesListPage.module.scss';
import {motion} from 'framer-motion';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import * as assets from "../../../utils/assets-manager";
import {NavLink, useLocation} from "react-router-dom";
import MoviePoster from "../../reusable/MoviePoster/MoviePoster";


function MoviesListPage(props) {
    const location = useLocation();
    const title = props.title ?? location.state?.title ?? '';
    const movieIds = props.movieIds ?? location.state?.movieIds ?? [];


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function spawnPoster(movieId) {
        return (
            <li className={styles['movies-list-page__grid-item']} key={movieId}>
                <NavLink className={styles['movie-poster-link']}
                         to={`${assets.pathMovieInfoPage}/${movieId}`}>

                    <MoviePoster className={styles['movie-poster']}
                                 movieId={movieId}/>

                </NavLink>
            </li>
        );
    }



    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <motion.div className={`${styles['movies-list-page']}`}
                    initial={'hidden'}
                    animate={'visible'}
                    variants={props.variants}>
            <HeaderWithBackButton className={`${styles['header']}`}
                                  backTo={assets.pathProfilePage}
                                  title={title}/>

            <ul className={`${styles['movies-list-page__grid']}`}>
                {movieIds.map(id => spawnPoster(id))}
            </ul>
        </motion.div>
    );
}// MoviesListPage


export default MoviesListPage;
