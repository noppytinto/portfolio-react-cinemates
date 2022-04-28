import {getNowPlaying, getPopular, getUpcoming} from "../services/movieDatabaseService";
import {useEffect, useRef, useState} from "react";
import * as assets from '../utils/assets-manager';

function useFetchMovies(type = '') {
    const delay = 700;
    let totPages = useRef(0);
    let timer = useRef(null);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isListEnded, setIsListEnded] = useState(false);


    ////////////////////////////////////
    // functions
    ////////////////////////////////////
    function nextPage() {
        console.log('current page:', page);
        console.log('current total pages:', totPages.current);
        if (page > totPages.current) {
            console.log('STOP NEXT');
            setIsListEnded(true);
            return;
        }
        if (isLoading) return;

        //
        setIsLoading(true);
        setPage(prev => prev+1);
    }

    useEffect(() => {
        console.log('useFetchMovies called');

        // debounce
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
            console.log('fetching movies................');

            // setting relative fetch function
            let fetchFunction = ((page)=>null);
            if(type) {
                if (type === assets.stringTitleNowPlaying) fetchFunction = getNowPlaying;
                else if (type === assets.stringTitlePopular) fetchFunction = getPopular;
                else if (type === assets.stringTitleUpcoming) fetchFunction = getUpcoming;
            }

            // fetching
            const [fetched, totalPages] = await fetchFunction(page);
            //
            totPages.current = totalPages;
            setMovies(prev => [...prev, ...fetched]);
            setIsLoading(false);

        }, delay);
    }, [page, totPages, setMovies, setIsLoading, timer, delay, type])


    //////////////////////////////////////
    //////////////////////////////////////
    return [movies, nextPage, isLoading, isListEnded];
}// useFetchMovies

export default useFetchMovies;