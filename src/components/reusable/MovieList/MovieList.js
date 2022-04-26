import React, {useEffect} from 'react';
import styles from './MovieList.module.css';
// import * as assetsManager from '../../../utils/assets-manager';
import MovieListItem from './MovieListItem/MovieListItem';

function MovieList(props) {
    let classes = `${styles['movie-list']} `;

    const movies = props.movies ?? [];
    const lastItemRef = React.createRef();

    useEffect(() => {
        if (lastItemRef.current) {
            props.onLastItemMounted(lastItemRef.current);
        }
    }, [lastItemRef])


    function spawnMovies(movies) {
        return (
            movies.map((movie, index) => {
                    if (index === movies.length-1) {
                        return (<MovieListItem key={movie.id}  movie={movie} ref={lastItemRef}/>);
                    }
                    return (<MovieListItem key={movie.id}  movie={movie}/>);
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