import {useRef } from 'react';
import styles from './SearchPage.module.scss';
import * as assets from '../../../utils/assets-manager';
import Snackbar from '../../../my-packages/snackbar-system/Snackbar';
import useSearchMovies from "../../../hooks/use-search-movies";
import MovieList from '../../reusable/MovieList/MovieList';

function SearchPage(props) {
    let classesSearchPage = `${styles['search-page']} `;
    let classesSearchLabel = `${styles['search-page__label']} `;
    let classesSearchResults = `${styles['search-page__results']} `;

    let classesSearchBox = `${styles['search-page__box']} `;
    let classesSearchContainerInput = `${styles['search-page__container-input']} `;
    let classesSearchInput = `${styles['search-page__input']} `;
    let classesSearchButton = `${styles['search-page__button']} `;
    let classesSearchIcon = `${styles['search-page__icon']} `;

    const [movies, nextPage, isLoading, isListEnded, search, searchQuery] = useSearchMovies();

    const searchInputRef = useRef();
    let intersectionObserver = useRef();
    

    ////////////////////////////
    // FUNCTIONS
    ////////////////////////////
    // useEffect(() => {
    //     if (!searchQuery) return;
    //     clearTimeout(timerRef.current);
    //     timerRef.current = setTimeout(() => {
    //         console.log('searching: ', searchQuery);

    //     }, delay);

    // }, [timerRef, searchInputRef, searchQuery, setMovies]);




    function onSubmitHandler(ev) {
        ev.preventDefault();
        const query = ev.target.query.value;

        search(query);
    }
    
    function onLastItemMounted(item) {
        if (isLoading) return;
        // console.log('last item mounted: ', item);

        const observerCallback = (entries, observer) => {
            const [entry] = entries;

            if (entry.isIntersecting) {
                observer.unobserve(entry.target);

                console.log('last item intersected');
                if (isLoading) {
                    return;
                }

                nextPage();
            }
        }

        const options = {
            root: null,
            threshold: [1]
        }

        intersectionObserver =
            new IntersectionObserver(observerCallback, options);
        intersectionObserver.observe(item);
    }

    function actionHandler(snackbar) {
        snackbar.dispose();
    }


    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div className={classesSearchPage}>
            {/**************************** SEARCH RESULTS*/}
            <p className={classesSearchLabel}>{assets.stringLabelSearch}   {searchQuery}</p>

            <div className={classesSearchResults}>
                <MovieList movies={movies}
                           onLastItemMounted={onLastItemMounted}/>
                {isLoading && <p className={styles['loading']}>Loading...</p>}
                {isListEnded && <Snackbar text={'No more movies'}
                                        actionLabel={'ok'}
                                        onClickAction={actionHandler}/>}
            </div>


            {/**************************** SEARCH BOX*/}
            <div className={classesSearchBox}>
                <form onSubmit={onSubmitHandler}>
                    <div className={classesSearchContainerInput}>
                        <input className={classesSearchInput}
                               type={'search'} 
                               placeholder={assets.stringPlaceholderSearch}
                               ref={searchInputRef}
                               name='query' 
                               ></input>
                        
            
                        <button className={classesSearchButton} 
                                type={'submit'}>
                            <assets.IconSearch  className={classesSearchIcon}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}// SearchPage

export default SearchPage;