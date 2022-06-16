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
import {motion} from 'framer-motion';


function MoviePage(props) {
    const classesMoviePage = `${styles['movie-page']} `;
    const params = useParams();
    const movieId = params.id;
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [showLists, setShowLists] = useState(false);
    const isLogged = useSelector(state => state.authSlice.isLogged);
    const dispatcher = useDispatch()

    let lists = {};
    let listKeys = [];
    let checkedLists = [];
    const userData = useSelector(state => state.authSlice.userData);
    if (isLogged) {
        if (Object.keys(userData).length !== 0) {
            lists = userData?.lists ?? {};
            listKeys = Object.keys(userData?.lists) ?? [];

            //
            for (const [ , movieIds] of Object.entries(lists)) {
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
        setShowLists(true);
    }

    function onClickOutsideHandler(ev) {
        setShowLists(false);
    }

    function onClickNegativeButtonHandler(ev) {
        setShowLists(false);
    }

    function onClickPositiveButtonHandler(ev) {
        let updatedLists = {...lists};

        listKeys.forEach((listName, i) => {
            const listIsChecked = checkedLists[i];
            const updatedList = [...lists[listName]];

            if (listIsChecked) {
                if (!updatedList.includes(movieId)) { // add only if the item is not included
                    updatedList.push(movieId);
                    userDao.addMovieToList(listName, movieId);
                }
            } else {
                if (updatedList.includes(movieId)) { // remove only if the item is included
                    removeAt(updatedList, movieId);
                    userDao.removeMovieFromList(listName, movieId);
                }
            }

            // set the updated list
            updatedLists[listName] = updatedList;
        })

        // update in-memory user data
        dispatcher(authActions.setUserLists({lists: updatedLists}))

        //
        setShowLists(false);
    }

    function onListCheckHandler(ev, i, isChecked) {
        checkedLists[i] = isChecked;
    }

    function removeAt(array, value) {
        if (array && array.length <= 0) return;
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
    }


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (
        <motion.div className={classesMoviePage}
                    initial="hidden"
                    animate="visible"
                    // exit="hidden"
                    variants={props.variants}
        >
            <HeaderWithBackButton className={`${styles['header']}`}
                                  title={''}/>

            {/******************** MOVIE BACKDROP */}
            <section className={`${styles['movie-page__container-backdrop']}`}>
                <div className={`${styles['movie-page__gradient']}`}></div>
                <img className={`${styles['movie-page__backdrop']}`}
                     src={movie.backdropUrl || assets.iconBrokenImage}
                     alt={movie.title}/>
                <h1 className={`${styles['movie-page__title']}`}>
                    {movie.title}</h1>

                {isLogged &&
                    <button className={styles['movie-page__btn-add-to-list']}
                            type={'button'}
                            onClick={onClickAddToListHandler}>+</button>}

                {showLists && <OptionsDialog items={listKeys}
                                             checkedItems={checkedLists}
                                             onItemCheck={onListCheckHandler}
                                             buttonNegativeAction={onClickNegativeButtonHandler}
                                             buttonPositiveAction={onClickPositiveButtonHandler}
                                             onClickOutside={onClickOutsideHandler}
                                             title={'My Lists'}
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
                             movieTitle={movie.title}/>

                <div className={`${styles['movie-page__container-listing']}`}>
                    <ul className={`${styles['movie-page__listing']}`}>
                        <li className={`${styles['movie-page__list-item']}`}>
                            <h3 className={`${styles['movie-page__list-title']}`}>
                                {assets.stringMovieDuration}</h3>
                            <p className={`${styles['movie-page__list-value']}`}>
                                {movie.duration + 'm'}</p></li>

                        <li className={`${styles['movie-page__list-item']}`}>
                            <h3 className={`${styles['movie-page__list-title']}`}>
                                {assets.stringMovieGenres}</h3>
                            <p className={`${styles['movie-page__list-value']}`}>
                                {movie.genres?.join(', ')}</p></li>

                        <li className={`${styles['movie-page__list-item']}`}>
                            <h3 className={`${styles['movie-page__list-title']}`}>
                                {assets.stringMovieStatus}</h3>
                            <p className={`${styles['movie-page__list-value']}`}>
                                {movie.status}</p></li>
                    </ul>
                </div>

            </section>

            {/******************** CAST */}
            <section className={`${styles['movie-page__container-cast']}`}>
                <h2 className={`${styles['movie-page__cast-title']}`}>Cast</h2>
                <CastList cast={cast}/>
            </section>
        </motion.div>
    );
}// MoviePage

export default MoviePage;