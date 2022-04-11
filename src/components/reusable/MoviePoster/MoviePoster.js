import styles from './MoviePoster.module.css';
import * as assetsManager from '../../../utils/AssetsManager';

function MoviePoster({posterImageUrl=assetsManager.brokenImageIcon, alt=''}) {
    let classes = `${styles['movie-poster']} `;
    let imageClasses = `${styles['movie-poster-image']} `;

    if (posterImageUrl === assetsManager.brokenImageIcon) {
        imageClasses = imageClasses + styles['broken-image'];
    }

    return (
        <div className={classes} >
            <img className={imageClasses} 
                 src={posterImageUrl} 
                 alt={alt} 
                 draggable={'false'}
                 />
        </div>
    );
}

export default MoviePoster;