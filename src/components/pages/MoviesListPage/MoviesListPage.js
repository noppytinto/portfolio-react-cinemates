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
import {useDispatch} from "react-redux";
import {authActions} from '../../../redux/slices/auth-slice';
import RoundButton from "../../reusable/RoundButton/RoundButton";
import ActionDialog from "../../reusable/Dialog/ActionDialog/ActionDialog";
import {updateMovieList} from "../../../dao/user-dao";
const MoviePosterWithFetcher = withFetcher(MoviePoster);
const MoviePosterWithFetcherAndCheckbox = withCheckbox(withFetcher(MoviePoster));


function MoviesListPage(props) {
    const location = useLocation();
    const title = props.title ?? location.state?.title ?? '';
    const listName = props.listName ?? location.state?.listName ?? '';
    const movieIds = props.movieIds ?? location.state?.movieIds ?? [];
    const [currentMovieIds, setCurrentMovieIds] = useState(movieIds);
    const [inEditMode, setInEditMode] = useState(false);
    const [moviesToRemove, setMoviesToRemove] = useState(new Set());
    const [inSelectAllMode, setInSelectAllMode] = useState(false);
    const dispatcher = useDispatch();
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function spawnPoster(movieId) {
        return (
            <li className={styles['movies-list-page__grid-item']} key={movieId}>
                <NavLink className={styles['movie-poster-link']}
                         to={`${assets.pathMovieInfoPage}/${movieId}`}>
                    <MoviePosterWithFetcher className={styles['movie-poster']}
                                            movieId={movieId}
                                            lazy={false}
                    />
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
                    lazy={false}
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

    function handleClickEdit(ev) {
        setInEditMode(true);
        console.log('inEditMode:', inEditMode);

        // dispatcher(authActions.setIsLogged({isLogged: false}));
        // navigate('/');
    }

    function onClickSelectAllHandler(ev) {
        setInSelectAllMode(!inSelectAllMode)
    }

    useEffect(() => {
        if (!inEditMode) return;

        inSelectAllMode ?
            setMoviesToRemove(new Set(currentMovieIds)) : setMoviesToRemove(new Set());
    }, [inSelectAllMode])

    // useEffect(() => {
    //     if (!inEditMode) return;
    //
    //     console.log(moviesToRemove);
    //
    // }, [moviesToRemove])


    function onClickDeleteHandler(ev) {
        if (moviesToRemove.size <=0 ) return;
        setShowConfirmationDialog(true);
    }

    async function removeMovies(moviesToRemove) {
        if (moviesToRemove.size <=0 ) return;

        const newList = new Set(currentMovieIds);
        for (let id of moviesToRemove) {
            newList.delete(id);
        }

        // TODO: update remote db
        await updateMovieList(listName, [...newList]);
        dispatcher(authActions.updateUserList({listKey: listName, updatedList: [...newList] }))

        setMoviesToRemove(new Set());
        setCurrentMovieIds([...newList]);
        setShowConfirmationDialog(false);

        console.log('deleting movies: ', [...newList]);
    }

    function handleClickPositiveButton(ev) {
        removeMovies(moviesToRemove);
    }

    function handleClickNegativeButton(ev) {
        setShowConfirmationDialog(false);
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
                    currentMovieIds.map(id => spawnCheckablePoster(id)) :
                    currentMovieIds.map(id => spawnPoster(id))
                }
            </ul>



            {(movieIds.length > 0 ) && (!inEditMode &&
                <RoundButton className={`${styles['movies-list-page__btn-edit']}`}
                             onClick={handleClickEdit}
                             icon={<assets.IconEdit />} />)
            }

            {showConfirmationDialog &&
                <ActionDialog buttonNegativeAction={handleClickNegativeButton}
                              buttonPositiveAction={handleClickPositiveButton}
                              onClickOutside={handleClickNegativeButton}>
                    <p>Are you sure you want remove selected movies?</p>
                </ActionDialog>}
        </motion.div>
    );
}// MoviesListPage


export default MoviesListPage;
