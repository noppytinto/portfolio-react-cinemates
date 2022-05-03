import {searchMovies} from "../services/movieDatabaseService";
import {useEffect, useRef, useState} from "react";


function useSearchMovies() {
    const delay = 700;
    let totPages = useRef(0);
    let timer = useRef(null);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [getNextPage, setGetNextPage] = useState(false);
    const [isListEnded, setIsListEnded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    ////////////////////////////////////
    // functions
    ////////////////////////////////////

    function search(query) {
        if (!query) return;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        // reset nextPage state
        setIsListEnded(false);
        setGetNextPage(false);
        setPage(1);
        setSearchQuery(query);
    }


    function nextPage() {
        console.log('current page:', page);
        console.log('current total pages:', totPages.current);
        if (page > totPages.current) {
            console.log('STOP NEXT');
            setIsListEnded(true);
            setGetNextPage(false);
            return;
        }
        if (isLoading) return;

        //
        setGetNextPage(true);
        setIsLoading(true);
        setPage(prev => prev+1);
    }

    // effect for search
    useEffect(() => {
        if (!searchQuery) return;

        console.log('useSearchMovies called');

        // debounce
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
            console.log('searching movies................');

            // fetching
            const [fetched, totalPages] = await searchMovies(searchQuery);
            console.log(fetched);
            //
            totPages.current = totalPages;
            setMovies(fetched);
            setIsLoading(false);

        }, delay);
    }, [totPages, setMovies, setIsLoading, timer, delay, searchQuery]);

    // effect for next page
    useEffect(() => {
        if (!searchQuery) return;
        if (!getNextPage) return;

        // debounce
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
            console.log('loading additional movies................');

            // fetching
            const [fetched] = await searchMovies(searchQuery, page);
            //
            setMovies(prev => [...prev, ...fetched]);
            setIsLoading(false);

        }, delay);
    }, [page, setMovies, setIsLoading, timer, delay, searchQuery, getNextPage])


    //////////////////////////////////////
    //////////////////////////////////////
    return [movies, nextPage, isLoading, isListEnded, search, searchQuery];
}// useSearchMovies

export default useSearchMovies;