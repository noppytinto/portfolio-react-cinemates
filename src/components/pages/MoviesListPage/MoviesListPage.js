import styles from './MoviesListPage.module.scss';
import { motion } from 'framer-motion';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import * as assets from "../../../utils/assets-manager";
import { NavLink, useLocation } from "react-router-dom";
import ActionBar from '../../reusable/ActionBar/ActionBar';
import { useState } from 'react';
import { withFetcher } from '../../reusable/MoviePoster/MoviePosterWithFetcher/MoviePosterWithFetcher';
import MoviePoster from '../../reusable/MoviePoster/MoviePoster';
import { withCheckbox } from '../../reusable/MoviePoster/MoviePosterWithCheckbox/MoviePosterWithCheckbox';

const MoviePosterWithFetcher = withFetcher(MoviePoster);
const MoviePosterWithFetcherAndCheckbox = withCheckbox(withFetcher(MoviePoster));


function MoviesListPage(props) {
    const location = useLocation();
    const title = props.title ?? location.state?.title ?? '';
    const movieIds = props.movieIds ?? location.state?.movieIds ?? [];
    const [inEditMode, setInEditMode] = useState(true);
    const [moviesToRemove, setMoviesToRemove] = useState(new Set());



    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function onChangeHandler(isChecked, movieId) {
        isChecked ? moviesToRemove.add(movieId) : moviesToRemove.delete(movieId);
        console.log('moviesToRemove: ', moviesToRemove);
        setMoviesToRemove(new Set(moviesToRemove));
    }

    function spawnPoster(movieId) {
        return (
            <li className={styles['movies-list-page__grid-item']} key={movieId}>
                {inEditMode ?
                    <MoviePosterWithFetcherAndCheckbox className={styles['movie-poster']}
                                                       movieId={movieId} 
                                                       onChange={onChangeHandler}/>
                    :
                    <NavLink className={styles['movie-poster-link']}
                        to={`${assets.pathMovieInfoPage}/${movieId}`}>
                        <MoviePosterWithFetcher className={styles['movie-poster']}
                                                movieId={movieId} />
                    </NavLink>
                }
            </li>
        );
    }

    function onClickCancelHandler(ev) {
        setMoviesToRemove(new Set);
        setInEditMode(false);
    }



    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <motion.div className={`${styles['movies-list-page']}`}
            initial={'hidden'}
            animate={'visible'}
            variants={props.variants}>

            {inEditMode ?
                <ActionBar className={styles['action-bar']}
                    title={'Selected: ' + moviesToRemove.size}
                    onClickCancel={onClickCancelHandler} />

                :

                <HeaderWithBackButton className={`${styles['header']}`}
                    backTo={assets.pathProfilePage}
                    title={title} />
            }


            <ul className={`${styles['movies-list-page__grid']}`}>
                {movieIds.map(id => spawnPoster(id))}
            </ul>
        </motion.div>
    );
}// MoviesListPage


export default MoviesListPage;
