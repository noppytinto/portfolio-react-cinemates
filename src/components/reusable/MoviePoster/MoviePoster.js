import styles from './MoviePoster.module.css';
import * as assetsManager from '../../../utils/assets-manager';
import {iconBrokenImage} from "../../../utils/assets-manager";

function MoviePoster({
        className, 
        posterImageUrl=assetsManager.iconBrokenImage,
        alt='', 
        movieTitle='',
        shadowed = true}
    ) {
    
    let classes = `${styles['movie-poster']} ${className} `;
    let imageClasses = `${styles['movie-poster-image']} `;
    let movieTitleClasses = `${styles['movie-title']} hidden`;

    if (shadowed) classes = `${classes} ${styles['movie-poster--shadowed']} `;

    if (posterImageUrl === assetsManager.iconBrokenImage) {
        classes = classes + styles['movie-poster--broken'];
        imageClasses = imageClasses + styles['movie-poster-image--broken'];
        movieTitleClasses = `${styles['movie-title']}`;
    }

    return (
        <div className={classes} >
            <img className={imageClasses} 
                 src={posterImageUrl} 
                 alt={alt} 
                 draggable={'false'}
                 loading={'lazy'}
                 />
            <p className={movieTitleClasses}>{movieTitle}</p>
        </div>
    );
}

export default MoviePoster;