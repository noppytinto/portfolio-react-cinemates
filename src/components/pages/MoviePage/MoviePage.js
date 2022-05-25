import styles from './MoviePage.module.scss';
import * as assets from '../../../utils/assets-manager';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {fetchCast, fetchMovie} from '../../../services/movie-database-service';
import MoviePoster from "../../reusable/MoviePoster/MoviePoster";
import CastList from "../../reusable/CastList/CastList";
import OptionsDialog from '../../reusable/Dialog/OptionsDialog/OptionsDialog';
import * as userDao from '../../../dao/user-dao';
import {useSelector} from "react-redux";


function MoviePage() {
    const classesMoviePage = `${styles['movie-page']} `;
    const params = useParams();
    const movieId = params.id;
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [showDialogList, setShowDialogList] = useState(false);
    const userData = useSelector(state => state.authSlice.userData);
    // console.log(userData);
    let lists = [];
    if (Object.keys(userData).length !== 0) {
        lists =  userData?.lists ?? [];
    }

    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////
    // fetch movie details
    useEffect(() => {
        (async () => {
            const fetchedMovie = await fetchMovie(movieId);
            const fetchedCast = await fetchCast(movieId);
            setMovie(fetchedMovie);
            setCast(fetchedCast);
        })();
    }, [setMovie, movieId]);

    function onClickAddToListHandler() {
        setShowDialogList(true);
    }

    function onClickOutsideAreaHandler(ev) {
        setShowDialogList(false);
        // console.log('clicked outside');
    }

    function positiveButtonHandler() {
        console.log('adding movie');
        setShowDialogList(false);
        userDao.addToWatchlist(movieId);
    }

    function negativeButtonHandler() {
        setShowDialogList(false);
    }


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (
        <div className={classesMoviePage}>
            <HeaderWithBackButton className={`${styles['header']}`}
                                  title={''}/>


            {/******************** MOVIE BACKDROP */}
            <section className={`${styles['movie-page__container-backdrop']}`}>
                <div className={`${styles['movie-page__gradient']}`}></div>
                <img className={`${styles['movie-page__backdrop']}`}
                     src={movie.backdropUrl}
                     alt={movie.title}/>
                <h1 className={`${styles['movie-page__title']}`}>
                    {movie.title}</h1>
                <button className={styles['movie-page__btn-add-to-list']} 
                        type={'button'}
                        onClick={onClickAddToListHandler}>+</button>
                {showDialogList && <OptionsDialog movieId={movieId}
                                                  lists={lists}
                                                  onClickOutsideArea={onClickOutsideAreaHandler}
                                                  buttonLeftLabel={'ok'}
                                                  buttonRightLabel={'cancel'}
                                                  buttonLeftAction={positiveButtonHandler}
                                                  buttonRightAction={negativeButtonHandler}
                                                  />}

            </section>

            {/******************** MOVIE OVERVIEW */}
            <section className={`${styles['movie-page__container-overview']}`}>
                <div className={`${styles['movie-page__release-date']}`}>
                    {`(${movie.releaseDate?.split('-')[0] || ''})`}</div>

                <p className={`${styles['movie-page__overview']}`}>
                    {movie.overview}</p>
            </section>

            {/******************** MOVIE DETAILS */}
            <section className={`${styles['movie-page__container-details']}`}>
                <MoviePoster className={`${styles['movie-page__poster']}`}
                             posterImageUrl={movie.posterUrl}
                             alt={movie.title}
                             movieTitle={movie.title}/>

                <div className={`${styles['movie-page__container-listing']}`}>
                    <ul  className={`${styles['movie-page__listing']}`}>
                        <li  className={`${styles['movie-page__list-item']}`}>
                            <h3 className={`${styles['movie-page__list-title']}`}>
                                {assets.stringMovieDuration}</h3>
                            <p className={`${styles['movie-page__list-value']}`}>
                                {movie.duration + 'm'}</p></li>

                        <li  className={`${styles['movie-page__list-item']}`}>
                            <h3 className={`${styles['movie-page__list-title']}`}>
                                {assets.stringMovieGenres}</h3>
                            <p className={`${styles['movie-page__list-value']}`}>
                                {movie.genres?.join(', ')}</p></li>

                        <li  className={`${styles['movie-page__list-item']}`}>
                            <h3 className={`${styles['movie-page__list-title']}`}>
                                {assets.stringMovieStatus}</h3>
                            <p className={`${styles['movie-page__list-value']}`}>
                                {movie.status}</p></li>
                    </ul>
                </div>

            </section>

            {/******************** CAST */}
            <section  className={`${styles['movie-page__container-cast']}`}>
                <h2 className={`${styles['movie-page__cast-title']}`}>Cast</h2>
                <CastList cast={cast} />
            </section>
        </div>
    );
}// MoviePage

export default MoviePage;