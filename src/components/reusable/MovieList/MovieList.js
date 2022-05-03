import React, {useEffect} from 'react';
import styles from './MovieList.module.scss';
import MovieListItem from './MovieListItem/MovieListItem';
import { v4 as uuidv4 } from 'uuid';

function MovieList(props) {
    let classes = `${styles['movie-list']} `;

    const movies = props.movies ?? [];
    const lastItemRef = React.createRef();


    //////////////////////////////////////
    // functions
    //////////////////////////////////////

    // when the last item is mounted
    // trigger useEffect
    useEffect(() => {
        if (lastItemRef.current) {
            props.onLastItemMounted(lastItemRef.current);
        }
    }, [lastItemRef, props])

    function spawnMovies(movies) {
        return (
            movies.map((movie, index) => {
                    // if is the last item
                    if (index === movies.length - 1) {
                        return (
                            <li key={uuidv4()} ref={lastItemRef}>
                                <MovieListItem movie={movie}/>
                            </li>
                        );
                    }

                    //
                    return (
                        <li key={uuidv4()}>
                            <MovieListItem movie={movie}/>
                        </li>
                    );
                }
            )
        );
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <ul className={classes}>
            {spawnMovies(movies)}
        </ul>
    );
}// MovieList

export default MovieList;