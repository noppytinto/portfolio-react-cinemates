import styles from './ExplorePageList.module.css';
// import * as assetsManager from '../../../utils/assets-manager';
import { useLocation } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import {useEffect, useRef, useState} from "react";
import HeaderWithBackButton
    from "../HeaderWithBackButton/HeaderWithBackButton";
import useFetchMovies from "../../../hooks/use-fetch-movies";

function ExplorePageList(props) {
    let classes = `${styles['explore-page-list']} `;
    let intersectionObserver = useRef();

    const location = useLocation();
    const listTitle = location.state?.title ?? '(no title)';

    const [movies, nextPage, isLoading] = useFetchMovies(listTitle);


    ////////////////////////////////////
    // functions
    ////////////////////////////////////
    function onLastItemMounted(item) {
        if (isLoading) return ;
        console.log('last item mounted: ', item);

        const observerCallback = (entries, observer) => {
            const [entry] = entries;

            if (entry.isIntersecting) {
                observer.unobserve(entry.target);

                console.log('last item intersected');
                if (isLoading) {
                    return ;
                }

                nextPage();
            }
        }

        const options = {
            root: null,
            threshold: [1]
        }

        intersectionObserver.current =
            new IntersectionObserver(observerCallback, options);

        if (item) {
            intersectionObserver.current.observe(item);
        }
        return () => {
            intersectionObserver.current.disconnect();
        };
    }



    ////////////////////////////////
    // JSX
    ////////////////////////////////
    return (
        <div className={classes}>
            <HeaderWithBackButton className={styles['explore-page-list__header']}
                                  backButtonUrl={'/explore'}
                                  title={listTitle}/>
            <MovieList movies={movies}
                       onLastItemMounted={onLastItemMounted}/>
        </div>
    );
}

export default ExplorePageList;