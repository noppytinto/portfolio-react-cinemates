import {searchMovies} from "../services/movie-database-service";
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
    const [isNewSearch, setIsNewSearch] = useState(false);
    // const willUseCached = useRef(false);


    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////
    console.log('searchQuery:', searchQuery);

    function searchMovie(query, useCached = false) {
        if (!query) return;
        
        // scrollToTop();
        resetState();
        setIsLoading(true);
        setSearchQuery(query);
    }

    function resetState() {
        setSearchQuery('');
        setIsLoading(false);
        setIsListEnded(false);
        setGetNextPage(false);
        setPage(1);
        setMovies([]);
        setIsNewSearch(true);
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    function nextPage() {
        console.log('current page:', page);
        console.log('current total pages:', totPages.current);
        if (page >= totPages.current) {
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

    // effect for searching
    useEffect(() => {
        if (!searchQuery) return;

        // debounce
        setIsNewSearch(false);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
            console.log('searching movies................');
            const [fetched, totalPages] = await searchMovies(searchQuery);
            
            //
            totPages.current = totalPages;
            setMovies(fetched);
            setIsLoading(false);

        }, delay);
    }, [totPages, setMovies, setIsLoading, timer, delay, searchQuery, isNewSearch, setIsNewSearch]);

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
            // localStorage.setItem('searchPageTotalPage', page);
            // localStorage.setItem('searchPageTotalPages', totalPages);

            //
            setMovies(prev => {
                const newMovies = [...prev, ...fetched];
                // localStorage.setItem('searchPageMovies', fetched);
                return newMovies;
            });
            setIsLoading(false);

        }, delay);
    }, [page, setMovies, setIsLoading, timer, delay, searchQuery, getNextPage])


    //////////////////////////////////////
    //////////////////////////////////////
    return [movies, nextPage, isLoading, isListEnded, searchMovie, searchQuery, resetState, setSearchQuery, setMovies];
}// useSearchMovies

export default useSearchMovies;