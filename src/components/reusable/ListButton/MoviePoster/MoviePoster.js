import styles from './MoviePoster.module.scss';
import { useEffect, useState } from 'react';
import {fetchMovie} from '../../../../services/movie-database-service';
import * as assets from '../../../../utils/assets-manager';


function MoviePoster(props) {
    const movieId = props.movieId;
    const [movie, setMovie] = useState(null);



    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    useEffect(() => {
        (async () => {
            if (!movieId) return;

            const mov = await fetchMovie(movieId);
            setMovie(mov);
        })();
    }, [movieId, setMovie]);


    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        (movie?.posterUrl) ? 

        <img className={`${styles['movie-poster']} ${props.className}`} 
        src={movie?.posterUrl ?? ''} 
        alt={movie?.title ?? 'cannot load image'} 
        loading={'lazy'}
        />

        :

        <div className={`${styles['movie-poster']} ${props.className}`}></div>

    );
    
}// MoviePoste

export default MoviePoster;