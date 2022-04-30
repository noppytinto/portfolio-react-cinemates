import styles from './ExplorePageList.module.css';
import * as assets from '../../../utils/assets-manager';
import {useLocation} from 'react-router-dom';
import {useRef} from "react";
import MovieList from '../MovieList/MovieList';
import HeaderWithBackButton
    from "../HeaderWithBackButton/HeaderWithBackButton";
import useFetchMovies from "../../../hooks/use-fetch-movies";
import Snackbar from '../../../my-packages/snackbar-system/Snackbar';


function ExplorePageList(props) {
    let classes = `${styles['explore-page-list']} `;
    let intersectionObserver = useRef();

    const location = useLocation();
    const listTitle = location.state?.title ?? assets.stringTitleMissing;

    const [movies, nextPage, isLoading, isListEnded] = useFetchMovies(listTitle);

    ////////////////////////////////////
    // functions
    ////////////////////////////////////
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

    ////////////////////////////////
    // JSX
    ////////////////////////////////
    return (
        <div className={classes}>
            <HeaderWithBackButton
                className={styles['explore-page-list__header']}
                backButtonUrl={assets.pathExplorePage}
                title={listTitle}/>

            <MovieList movies={movies}
                       onLastItemMounted={onLastItemMounted}/>

            {isLoading && <p className={styles['loading']}>Loading...</p>}
            {/*{isListEnded && <p className={styles['list-ended']}>-- fin --</p>}*/}
            {/*{<p className={styles['loading']}>Loading...</p>}*/}

            {isListEnded && <Snackbar text={'No more movies'}
                                      actionLabel={'ok'}
                                      onClickAction={actionHandler}/>}
        </div>
    );
}

export default ExplorePageList;