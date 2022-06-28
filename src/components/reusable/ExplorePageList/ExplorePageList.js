import * as assets from '../../../utils/assets-manager';
import {useLocation} from 'react-router-dom';
import {useRef} from "react";
import MovieList from '../MovieList/MovieList';
import HeaderWithBackButton
    from "../HeaderWithBackButton/HeaderWithBackButton";
import useFetchMovies from "../../../hooks/use-fetch-movies";
import Snackbar from '../../../my-packages/snackbar-system/Snackbar';
import {motion} from 'framer-motion';
import styles from './ExplorePageList.module.scss';


function ExplorePageList(props) {
    let classes = `${styles['explore-page-list']} `;
    let intersectionObserver = useRef();

    const location = useLocation();
    const listTitle = location.state?.title ?? assets.stringTitleMissing;

    const [movies, nextPage, isLoading, isListEnded] = useFetchMovies(listTitle);

    console.log('list is ended:', isListEnded);
    ////////////////////////////////////
    // functions
    ////////////////////////////////////
    function onLastItemVisibleHandler(item) {
        if (isLoading) return;
        // console.log('last item mounted: ', item);

        console.log('last item intersected');
        nextPage();

        // const observerCallback = (entries, observer) => {
        //     const [entry] = entries;
        //
        //     if (entry.isIntersecting) {
        //         observer.unobserve(entry.target);
        //
        //         console.log('last item intersected');
        //         if (isLoading) {
        //             return;
        //         }
        //
        //         nextPage();
        //     }
        // }
        //
        // const options = {
        //     root: null,
        //     threshold: [1]
        // }
        //
        // intersectionObserver =
        //     new IntersectionObserver(observerCallback, options);
        // intersectionObserver.observe(item);
    }

    function actionHandler(snackbar) {
        snackbar.dispose();
    }

    ////////////////////////////////
    // JSX
    ////////////////////////////////
    return (
        <motion.div className={classes}
                    initial="hidden"
                    animate="visible"
                    // exit="hidden"
                    variants={props.variants}
        >
            <HeaderWithBackButton
                className={styles['explore-page-list__header']}
                title={listTitle}/>

            <MovieList movies={movies}
                       onLastItemVisible={onLastItemVisibleHandler}/>

            {isLoading && <p className={styles['loading']}>Loading...</p>}
            {/*{isListEnded && <p className={styles['list-ended']}>-- fin --</p>}*/}
            {/*{<p className={styles['loading']}>Loading...</p>}*/}

            {isListEnded && <Snackbar text={'No more movies'}
                                      actionLabel={'ok'}
                                      onClickAction={actionHandler}/>}
        </motion.div>
    );
}

export default ExplorePageList;