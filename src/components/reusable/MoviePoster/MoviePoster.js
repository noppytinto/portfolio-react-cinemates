import styles from './MoviePoster.module.css';
import * as assetsManager from '../../../utils/assets-manager';

function MoviePoster({posterImageUrl=assetsManager.brokenImageIcon, alt='', movieTitle=''}) {
    let classes = `${styles['movie-poster']} `;
    let imageClasses = `${styles['movie-poster-image']} `;
    let movieTitleClasses = `${styles['movie-title']} hidden`;

    if (posterImageUrl === assetsManager.brokenImageIcon) {
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