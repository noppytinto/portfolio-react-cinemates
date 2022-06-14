import styles from './MoviePoster.module.scss';
import * as assetsManager from '../../../utils/assets-manager';


function MoviePoster(props) {
    let movieTitle = props.movieTitle ?? '';
    let shadowed = props.shadowed ?? true;
    let posterUrl = props.posterImageUrl ?? assetsManager.iconBrokenImage;

    let classes = `${styles['movie-poster']} ${props.className} `;
    let imageClasses = `${styles['movie-poster-image']} `;
    let movieTitleClasses = `${styles['movie-title']} hidden`;

    if (shadowed) classes = `${classes} ${styles['movie-poster--shadowed']} `;
    if (posterUrl === assetsManager.iconBrokenImage) {
        classes = classes + styles['movie-poster--broken'];
        imageClasses = imageClasses + styles['movie-poster-image--broken'];
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
                 loading={'lazy'}
                 />
            <p className={movieTitleClasses}>{movieTitle}</p>
        </div>
    );
}

export default MoviePoster;