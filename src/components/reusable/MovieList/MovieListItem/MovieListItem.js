import styles from './MovieListItem.module.scss';
import MoviePoster from '../../MoviePoster/MoviePoster';
import { useNavigate } from 'react-router-dom';
import * as assets from '../../../../utils/assets-manager';
import {memo, useEffect, useRef} from "react";
import {motion} from 'framer-motion';
import useIntersection from "./use-interesection";

function _propsAreEqual(prev, next) {
    // console.log('prev', prev);
    // console.log('next', next);
    return prev.index === next.index;
}

const MovieListItem = memo((props) => {
    let classes = `${styles['movie-list-item']} `;

    const movie =props.movie;
    const index = props.index;

    const ref = useRef();
    const isVisible = useIntersection(ref);
    const navigate = useNavigate();

    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    useEffect(() => {
        if (isVisible) props.onItemVisible?.();

    }, [props, isVisible]);


    function goToMoviePage(ev) {
        ev.preventDefault();
        navigate(`${assets.pathMovieInfoPage}/${movie.id}`);
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <motion.li className={classes}
                   onClick={goToMoviePage}
                   initial={{opacity: 0}}
                   animate={{opacity: 1}}
                   ref={ref}
                   transition={{duration: 0.1}}
        >
            <div  className={styles['movie-poster']}>
                <MoviePoster shadowed={false}
                             posterImageUrl={movie.posterUrl}
                             alt={movie.title}
                             movieTitle={movie.title}/>
            </div>

            <div className={styles['text-content']}>
                <h2 className={styles['movie-title']}>{movie.title}</h2>
                <p className={styles['movie-overview']}>{movie.overview}</p>
            </div>
        </motion.li>
    );

}, _propsAreEqual);// MovieListItem


export default MovieListItem;

// const MovieListItem = React.forwardRef((props, ref) =>{
//
// });