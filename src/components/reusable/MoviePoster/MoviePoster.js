import styles from './MoviePoster.module.scss';
import * as assets from '../../../utils/assets-manager';


function MoviePoster(props) {
    let movieTitle = props.movieTitle ?? '';
    let shadowed = props.shadowed ?? true;
    let posterUrl = props.posterImageUrl || '';
    let lazy = props.lazy ?? true;

    let classes = `${styles['movie-poster']} ${props.className} `;
    let imageClasses = `${styles['movie-poster__image']} `;
    let movieTitleClasses = `${styles['movie-title']} hidden`;

    if (shadowed) classes = `${classes} ${styles['movie-poster--shadowed']} `;
    if (!posterUrl) {
        posterUrl = assets.iconBrokenImage
        classes = `${styles['movie-poster']} ${props.className} ${styles['movie-poster--broken']}`;
        imageClasses = `${styles['movie-poster__image']} ${styles['movie-poster__image--broken']}`;
        movieTitleClasses = `${styles['movie-title']}`;
    }


    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (
        <div className={classes} >
            <img className={imageClasses}
                 src={posterUrl}
                 alt={movieTitle}
                 draggable={'false'}
                 loading={lazy ? 'lazy' : 'eager'}
                 />
            <p className={movieTitleClasses}> {movieTitle} </p>
        </div>
    );
}

export default MoviePoster;