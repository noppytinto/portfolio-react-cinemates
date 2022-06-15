import styles from './MoviesListPage.module.scss';
import {motion} from 'framer-motion';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import * as assets from "../../../utils/assets-manager";
import {NavLink, useLocation} from "react-router-dom";
import ActionBar from '../../reusable/ActionBar/ActionBar';
import {useEffect, useState} from 'react';
import MoviePoster from '../../reusable/MoviePoster/MoviePoster';
import withFetcher from '../../reusable/MoviePoster/withFetcher/withFetcher';
import withCheckbox from '../../reusable/MoviePoster/withCheckbox/withCheckbox';

const MoviePosterWithFetcher = withFetcher(MoviePoster);
const MoviePosterWithFetcherAndCheckbox = withCheckbox(withFetcher(MoviePoster));


function MoviesListPage(props) {
    const location = useLocation();
    const title = props.title ?? location.state?.title ?? '';
    const movieIds = props.movieIds ?? location.state?.movieIds ?? [];
    const [inEditMode, setInEditMode] = useState(false);
    const [moviesToRemove, setMoviesToRemove] = useState(new Set());
    const [inSelectAllMode, setInSelectAllMode] = useState(false);


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function spawnPoster(movieId) {
        return (
            <li className={styles['movies-list-page__grid-item']} key={movieId}>
                <NavLink className={styles['movie-poster-link']}
                         to={`${assets.pathMovieInfoPage}/${movieId}`}>
                    <MoviePosterWithFetcher className={styles['movie-poster']}
                                            movieId={movieId}/>
                </NavLink>
            </li>
        );
    }

    function spawnCheckablePoster(movieId) {
        return (
            <li className={styles['movies-list-page__grid-item']}
                key={movieId + inSelectAllMode}>
                <MoviePosterWithFetcherAndCheckbox
                    className={styles['movie-poster']}
                    movieId={movieId}
                    onChange={onChangeHandler}
                    checked={inSelectAllMode}
                />
            </li>
        )
    }

    function onChangeHandler(isChecked, movieId) {
        isChecked ? moviesToRemove.add(movieId) : moviesToRemove.delete(movieId);
        console.log(moviesToRemove);
        setMoviesToRemove(new Set(moviesToRemove));
    }

    function onClickCancelHandler(ev) {
        setMoviesToRemove(new Set());
        setInEditMode(false);
        setInSelectAllMode(false);
    }

    function onClickEditHandler(ev) {
        setInEditMode(true);
        console.log('inEditMode:', inEditMode);
    }

    function onClickSelectAllHandler(ev) {
        setInSelectAllMode(!inSelectAllMode)
    }

    useEffect(() => {
        if (!inEditMode) return;

        inSelectAllMode ?
            setMoviesToRemove(new Set(movieIds)) : setMoviesToRemove(new Set());
    }, [inSelectAllMode])

    // useEffect(() => {
    //     if (!inEditMode) return;
    //
    //     console.log(moviesToRemove);
    //
    // }, [moviesToRemove])


    function onClickDeleteHandler(ev) {
        
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
                           onClickCancel={onClickCancelHandler}
                           onClickSelectAll={onClickSelectAllHandler}
                           onClickDelete={onClickDeleteHandler}
                />

                :

                <HeaderWithBackButton className={`${styles['header']}`}
                                      backTo={assets.pathProfilePage}
                                      title={title}/>
            }


            <ul className={`${styles['movies-list-page__grid']}`}>
                {inEditMode ?
                    movieIds.map(id => spawnCheckablePoster(id)) :
                    movieIds.map(id => spawnPoster(id))
                }
            </ul>


            {!inEditMode &&
                <button className={`${styles['movies-list-page__btn-edit']}`}
                        type={'button'}
                        onClick={onClickEditHandler}>
                    <assets.IconEdit
                        className={`${styles['movies-list-page__icon-edit']}`}/>
                </button>
            }

        </motion.div>
    );
}// MoviesListPage


export default MoviesListPage;
