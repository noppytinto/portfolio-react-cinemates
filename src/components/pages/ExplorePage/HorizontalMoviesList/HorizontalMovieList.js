import MoviePoster from '../../../reusable/MoviePoster/MoviePoster';
import styles from './HorizontalMovieList.module.css';
import ListHeader from './ListHeader/ListHeader';

// import * as assetsManager from '../../../utils/AssetsManager';

function HorizontalMovieList({
                                 title = 'Header',
                                 movies = [],
                                 buttonText = 'Button',
                                 seeAllUrl = '/',
                                 seeAllData = {}
                             }) {

    function spawnMoviePoster(movie) {
        return (
            <li className={styles['list-item']} key={movie.id}>
                <MoviePoster className={styles['movie-poster']} 
                             posterImageUrl={movie.posterUrl}
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
            <ListHeader title={title} 
                        buttonText={buttonText} 
                        buttonUrl={seeAllUrl} 
                        linkData={seeAllData}/>
            <div className={styles['list-container']}>
                <ul>{movies.map(movie => spawnMoviePoster(movie))}</ul>
            </div>
        </div>
    );
}

export default HorizontalMovieList;