import {useEffect, useRef} from 'react';
import styles from './SearchPage.module.scss';
import * as assets from '../../../utils/assets-manager';
import Snackbar from '../../../my-packages/snackbar-system/Snackbar';
import useSearchMovies from "../../../hooks/use-search-movies";
import MovieList from '../../reusable/MovieList/MovieList';
import {searchMoviePageActions} from '../../../redux/slices/search-movie-page-slice';
import {useDispatch, useSelector} from "react-redux";
import {motion} from 'framer-motion';

function SearchPage(props) {
    let classesSearchPage = `${styles['search-page']} `;
    let classesSearchLabel = `${styles['search-page__label']} `;
    let classesSearchResults = `${styles['search-page__results']} `;
    let classesSearchBox = `${styles['search-page__box']} `;
    let classesSearchContainerInput = `${styles['search-page__container-input']} `;
    let classesSearchInput = `${styles['search-page__input']} `;
    let classesSearchInputField = `${styles['search-page__input-field']} `;
    let classesSearchButton = `${styles['search-page__btn-search']} `;
    let classesClearButton = `${styles['search-page__btn-clear']} `;
    let classesSearchIcon = `${styles['search-page__icon-search']} `;
    let classesClearIcon = `${styles['search-page__icon-clear']} `;

    const dispatch = useDispatch();
    const previousQueryString = useSelector((state) => state.searchMoviePageSlice.query);
    // const previousQueryString = localStorage.getItem('previousQueryString');

    const [movies, nextPage, isLoading, isListEnded, searchMovie, searchQuery, resetState, setSearchQuery, setMovies] = useSearchMovies();

    const searchInputRef = useRef();


    ////////////////////////////
    // FUNCTIONS
    ////////////////////////////
    useEffect(() => {
        console.log('previous query string:', previousQueryString);

        if (previousQueryString) {
            searchInputRef.current.value = previousQueryString;
            searchMovie(previousQueryString);
        }

    }, []);

    function onSubmitHandler(ev) {
        ev.preventDefault();

        setMovies([]);

        const query = searchInputRef.current.value;
        dispatch(searchMoviePageActions.saveQueryString({query: query}));
        searchMovie(query);
    }
    
    function onLastItemVisibleHandler(item) {
        if (isLoading) return;
        nextPage();
    }

    function snackbarActionHandler(snackbar) {
        snackbar.dispose();
    }

    function onClickButtonClearHandler(ev) {
        ev.preventDefault();
        if (!searchInputRef.current.value) return;

        searchInputRef.current.value = '';
        dispatch(searchMoviePageActions.resetQueryString());
        resetState();
    }

    // function onChangeInpuFieldHandler(ev) {
    //     // TODO: hide clear button when field is empty
    // }

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <motion.div className={classesSearchPage}
                    initial="hidden"
                    animate="visible"
                    // exit="hidden"
                    variants={props.variants}
                    >
            {/**************************** SEARCH RESULTS*/}
            <p className={classesSearchLabel}>{assets.stringLabelSearch}   {searchQuery}</p>

            <div className={classesSearchResults}>
                <MovieList movies={movies}
                           onLastItemVisible={onLastItemVisibleHandler}/>
                {isLoading && <p className={styles['loading']}>{assets.stringLabelLoading}</p>}
                {isListEnded && <Snackbar text={'No more movies'}
                                          actionLabel={'ok'}
                                          onClickAction={snackbarActionHandler}/>}
            </div>


            {/**************************** SEARCH BOX */}
            <div className={classesSearchBox}>
                <form onSubmit={onSubmitHandler}>
                    <div className={classesSearchContainerInput}>

                        {/**************************** SEARCH INPUT */}
                        <div className={classesSearchInput}>
                            <input className={classesSearchInputField}
                                   type={'text'}
                                   placeholder={assets.stringPlaceholderSearch}
                                   ref={searchInputRef}
                                   name='query' >
                            </input>
                            <button className={classesClearButton}
                                    type={'reset'}
                                    onClick={onClickButtonClearHandler}>
                                <assets.IconClear  className={classesClearIcon}/>
                            </button>
                        </div>

                        
                        {/**************************** SEARCH BUTTON */}
                        <button className={classesSearchButton} 
                                type={'submit'}>
                            <assets.IconSearch  className={classesSearchIcon}/>
                        </button>

                    </div>
                </form>
            </div>
        </motion.div>
    );
}// SearchPage

export default SearchPage;