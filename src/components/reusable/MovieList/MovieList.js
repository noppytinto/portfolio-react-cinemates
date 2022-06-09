import React, {memo, useEffect} from 'react';
import styles from './MovieList.module.scss';
import MovieListItem from './MovieListItem/MovieListItem';
import { v4 as uuidv4 } from 'uuid';


function MovieList(props) {
    const movies = props.movies ?? [];
    const onLastItemVisible = props.onLastItemVisible ?? (()=>{});

    let classes = `${styles['movie-list']} `;


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    // when the last item is mounted
    // trigger useEffect
    // useEffect(() => {
    //     if (lastItemRef.current) {
    //         onLastItemMounted(lastItemRef.current);
    //     }
    // }, [lastItemRef, props])

    function onItemVisibleHandler() {
        console.log('last item visible');
        onLastItemVisible();
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <ul className={classes}>
            {movies.map((movie, index) => {
                const isLastItem = (index === movies.length - 1);

                return <MovieListItem key={movie.id}
                                      movie={movie}
                                      onItemVisible={isLastItem ? onItemVisibleHandler : (()=>{})}
                                      index={index} />;
            })}
        </ul>
    );
}// MovieList

export default MovieList;