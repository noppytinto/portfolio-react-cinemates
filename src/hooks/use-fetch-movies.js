import {
    getNowPlaying,
    getPopular,
    getUpcoming
} from "../services/movieDatabaseService";
import {useCallback, useEffect, useRef, useState} from "react";

function useFetchMovies(type = '') {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    let timer = useRef(null);

    ////////////////////////////////////
    // functions
    ////////////////////////////////////
    function nextPage() {
        console.log('current page: ', page);
        if (isLoading) return;
        setPage(prev => prev+1);
        setIsLoading(true);
    }

    useEffect(() => {
        console.log('useFetchMovies called');

        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
            console.log('fetching movies................');

            let fetchFunction = ((page)=>{return;});
            if(type) {
                if (type === 'Now playing') fetchFunction = getNowPlaying;
                else if (type === 'Popular') fetchFunction = getPopular;
                else if (type === 'Upcoming') fetchFunction = getUpcoming;
            }

            const fetched = await fetchFunction(page);
            console.log(fetched);
            setMovies(prev => [...prev, ...fetched]);
            setIsLoading(false);
        }, 2000);
    }, [page])


    //////////////////////////////////////
    //////////////////////////////////////
    return [movies, nextPage, isLoading];
}// useFetchMovies

export default useFetchMovies;