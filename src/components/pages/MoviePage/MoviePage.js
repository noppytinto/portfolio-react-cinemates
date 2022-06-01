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
import {useDispatch, useSelector} from "react-redux";
import {authActions} from '../../../redux/slices/auth-slice';

function MoviePage() {
    const classesMoviePage = `${styles['movie-page']} `;
    const params = useParams();
    const movieId = params.id;
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [showDialogList, setShowDialogList] = useState(false);
    const isLogged = useSelector(state => state.authSlice.isLogged);
    const dispatcher = useDispatch()

    let lists = {};
    let listNames = [];
    let checkedLists = [];
    const userData = useSelector(state => state.authSlice.userData);
    if (isLogged) {
        // console.log(userData);
        if (Object.keys(userData).length !== 0) {
            lists =  userData?.lists ?? {};
            listNames =  Object.keys(userData?.lists) ?? [];

            //
            for (const [listName, movieIds] of Object.entries(lists)) {
                checkedLists.push(movieIds.includes(movieId));
            }

            // console.log(lists);
        }
    }


    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////
    // fetch movie info
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
    }

    function onClickNegativeButtonHandler(ev, checkedItems) {
        setShowDialogList(false);
    }

    function onClickPositiveButtonHandler(ev, checkedItems) {
        let newLists = {...lists};
        let newUserData = {...userData};

        listNames.forEach((listName, i) => {
            const isChecked = checkedItems[i];
            const updatedList = [...newLists[listName]];
            console.log(updatedList);
            if(isChecked) {
                // console.log('adding ', movieId ,' to list', listName );
                if(!updatedList.includes(movieId)) {
                    updatedList.push(movieId);
                    userDao.addToList(listName, movieId);
                }
            }
            else {
                // console.log('removing ', movieId ,' to list', listName );
                if(updatedList.includes(movieId)) {
                    removeAt(updatedList, movieId);
                    userDao.removeFromList(listName, movieId);
                }
            }

            newLists[listName] = updatedList;
        })

        // update in-memory user data
        newUserData.lists = newLists;
        dispatcher(authActions.setUserData({userData: newUserData}))

        //
        setShowDialogList(false);
    }

    function removeAt(array, value) {
        if (array && array.length<=0) return;
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
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

                {isLogged && <button className={styles['movie-page__btn-add-to-list']}
                                     type={'button'}
                                     onClick={onClickAddToListHandler}>+</button>}

                {showDialogList && <OptionsDialog movieId={movieId}
                                                  items={listNames}
                                                  checkedItems={checkedLists}
                                                  buttonNegativeAction={onClickNegativeButtonHandler}
                                                  buttonPositiveAction={onClickPositiveButtonHandler}
                                                  onClickOutsideArea={onClickOutsideAreaHandler}
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