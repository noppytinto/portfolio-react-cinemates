import styles from './MovieListItem.module.scss';
import MoviePoster from '../../MoviePoster/MoviePoster';
import { useNavigate } from 'react-router-dom';
import * as assets from '../../../../utils/assets-manager';

function MovieListItem(props) {
    const movie = props.movie;
    let classes = `${styles['movie-list-item']} `;
    const navigate = useNavigate();

    function goToMoviePage(ev) {
        ev.preventDefault();
        navigate(`${assets.pathMovieInfoPage}/${movie.id}`);
    }

    return (
        <div className={classes} onClick={goToMoviePage}>
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
        </div>
    );
}

// const MovieListItem = React.forwardRef((props, ref) =>{
//
// });

export default MovieListItem;