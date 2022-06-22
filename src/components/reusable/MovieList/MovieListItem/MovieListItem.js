import styles from './MovieListItem.module.scss';
import MoviePoster from '../../MoviePoster/MoviePoster';
import {useNavigate} from 'react-router-dom';
import * as assets from '../../../../utils/assets-manager';
import {memo, useEffect, useRef} from "react";
import {motion} from 'framer-motion';
import useIntersection from "../../../../hooks/use-interesection";


const item = {
    hidden: {opacity: 0},
    show: {opacity: 1}
};

function _propsAreEqual(prev, next) {
    return prev.movie.id === next.movie.id;
}

const MovieListItem = memo((props) => {
    const movie = props.movie;
    const ref = useRef();
    const isVisible = useIntersection(ref);
    const navigate = useNavigate();


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    useEffect(() => {
        if (isVisible) props.onItemVisible?.();

    }, [props.onItemVisible, isVisible]);


    function goToMoviePage(ev) {
        ev.preventDefault();
        navigate(`${assets.pathMovieInfoPage}/${movie.id}`);
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <motion.li className={`${styles['movie-list-item']} ${props.className}`}
                   ref={ref}
                   onClick={goToMoviePage}
                   variants={item}>
                    
            <div className={styles['movie-poster']}>
                <MoviePoster shadowed={false}
                             posterImageUrl={movie.posterUrl}
                             movieTitle={movie.title}
                             lazy={true}
                />
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