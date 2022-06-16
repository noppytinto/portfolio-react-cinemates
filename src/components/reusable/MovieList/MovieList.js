import React from 'react';
import styles from './MovieList.module.scss';
import MovieListItem from './MovieListItem/MovieListItem';
// import { v4 as uuidv4 } from 'uuid';
import {motion} from 'framer-motion';

const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};


function MovieList(props) {
    const movies = props.movies ?? [];
    const onLastItemVisible = props.onLastItemVisible ?? (() => {
    });

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
    return (movies.length > 0) ? (

        <motion.ul className={classes}
                   variants={container}
                   initial="hidden"
                   animate="show">

            {movies.map((movie, index) => {
                const isLastItem = (index === movies.length - 1);

                return <MovieListItem
                    key={movie.id}
                    movie={movie}
                    onItemVisible={isLastItem ? onItemVisibleHandler : (() => {})}
                    index={index}
                />
            })}

        </motion.ul>
    ) : <div></div>;
}// MovieList

export default MovieList;