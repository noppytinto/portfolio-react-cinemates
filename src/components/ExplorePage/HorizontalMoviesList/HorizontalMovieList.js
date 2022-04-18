import MoviePoster from '../../reusable/MoviePoster/MoviePoster';
import styles from './HorizontalMovieList.module.css';
import ListHeader from './ListHeader/ListHeader';
import * as assetsManager from '../../../utils/AssetsManager';

function HorizontalMovieList({title='Header', movieList=[], buttonText='Button'}) {


    return (
        <div className={styles['horizontal-movie-list']} >
            <ListHeader title={title} buttonText={buttonText} />
            <ul>
                {
                    movieList.map(movie => {
                        console.log('poster: ', movie.poster_path);
                        return (
                            <li key={movie.id}>
                                <MoviePoster posterImageUrl={'https://image.tmdb.org/t/p/w300' + movie.poster_path} />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default HorizontalMovieList;