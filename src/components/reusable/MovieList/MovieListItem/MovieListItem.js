import styles from './MovieListItem.module.css';
import MoviePoster from '../../MoviePoster/MoviePoster';
// import * as assetsManager from '../../../../utils/assets-manager';

function MovieListItem({movie}) {
    let classes = `${styles['movie-list-item']} `;

    return (
        <li className={classes} >
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
        </li>
    );
}

export default MovieListItem;