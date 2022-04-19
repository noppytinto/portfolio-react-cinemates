import MoviePoster from '../../reusable/MoviePoster/MoviePoster';
import styles from './HorizontalMovieList.module.css';
import ListHeader from './ListHeader/ListHeader';

// import * as assetsManager from '../../../utils/AssetsManager';

function HorizontalMovieList({title = 'Header', movieList = [], buttonText = 'Button'}) {

  function spawnMoviePoster(movie) {
    return (
      <li key={movie.id}>
        <MoviePoster posterImageUrl={movie.posterUrl}
                     alt={movie.title}
                     movieTitle={movie.title}/>
      </li>
    );
  }

  ///////////////////////////////
  // JSX
  ///////////////////////////////
  return (
    <div className={styles['horizontal-movie-list']}>
      <ListHeader title={title} buttonText={buttonText}/>
      <ul>{movieList.map(movie => spawnMoviePoster(movie))}</ul>
    </div>
  );
}

export default HorizontalMovieList;