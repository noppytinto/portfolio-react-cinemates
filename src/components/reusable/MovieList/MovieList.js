import styles from './MovieList.module.css';
// import * as assetsManager from '../../../utils/assets-manager';
import MovieListItem from './MovieListItem/MovieListItem';

function MovieList({movies = []}) {
    let classes = `${styles['movie-list']} `;


    function spawnMovies() {
        return (
            movies.map(movie => <li><MovieListItem movie={movie} /></li>)
        );
    }


    return (
        <ul className={classes} >
            {spawnMovies(movies)}
        </ul>
    );
}

export default MovieList;