import styles from './MoviePoster.module.css';

function MoviePoster({posterImageUrl='', alt=''}) {

    return (
        <div className={styles['movie-poster']} >
            <img className={styles['movie-poster-image']} 
                 src={posterImageUrl} 
                 alt={alt} />

            <span class="material-icons-outlined">
            broken_image
            </span>
        </div>
    );
}

export default MoviePoster;