import styles from './MoviePoster.module.scss';
import * as assetsManager from '../../../utils/assets-manager';
import {useEffect, useState} from "react";
import {fetchMovie} from "../../../services/movie-database-service";


function MoviePoster(props) {
    let movieTitle = props.movieTitle ?? '';
    let shadowed = props.shadowed ?? true;
    const movieId = props.movieId ?? null;
    let posterUrl = props.posterImageUrl;
    const [movie, setMovie] = useState({});

    let classes = `${styles['movie-poster']} ${props.className} `;
    let imageClasses = `${styles['movie-poster-image']} `;
    let movieTitleClasses = `${styles['movie-title']} hidden`;

    if (shadowed) classes = `${classes} ${styles['movie-poster--shadowed']} `;
    if (posterUrl === assetsManager.iconBrokenImage ||
        movie.posterUrl === assetsManager.iconBrokenImage) {
        classes = classes + styles['movie-poster--broken'];
        imageClasses = imageClasses + styles['movie-poster-image--broken'];
        movieTitleClasses = `${styles['movie-title']}`;
    }


    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////
    useEffect(() => {
        if (!movieId) {
            setMovie({
                title: movieTitle,
                posterUrl
            })
            return;
        }

        (async () => {
            const mov = await fetchMovie(movieId);
            setMovie(mov);
        })();
    }, [setMovie, movieId, posterUrl, movieTitle]);


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (
        <div className={classes} >
            <img className={imageClasses}
                 src={movie.posterUrl}
                 alt={movie.title}
                 draggable={'false'}
                 loading={'lazy'}
                 />
            <p className={movieTitleClasses}>{movie.title}</p>
        </div>
    );
}

export default MoviePoster;