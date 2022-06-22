import React from 'react';
import styles from './MovieList.module.scss';
import MovieListItem from './MovieListItem/MovieListItem';
import {motion} from 'framer-motion';

const containerVariants = {
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
    const onLastItemVisible = props.onLastItemVisible ?? (() => {});


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function handleOnItemVisible() {
        console.log('last item visible');
        onLastItemVisible();
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (movies.length > 0) ? (
        <motion.ul className={`${styles['movie-list']} ${props.className}`}
                   variants={containerVariants}
                   initial="hidden"
                   animate="show">

            {movies.map((movie, index) => {
                const isLastItem = (index === movies.length - 1);

                return <MovieListItem key={movie.id}
                                      movie={movie}
                                      onItemVisible={isLastItem ? handleOnItemVisible : (() => {})}
                                      index={index} />
            })}

        </motion.ul>
    ) : <div></div>;
}// MovieList

export default MovieList;