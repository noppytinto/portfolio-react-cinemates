import MoviePoster from '../../reusable/MoviePoster/MoviePoster';
import styles from './HorizontalMovieList.module.css';
import ListHeader from './ListHeader/ListHeader';
import * as assetsManager from '../../../utils/AssetsManager';

function HorizontalMovieList({title='Header', movieList=[], buttonText='Button'}) {

    return (
        <div className={styles['horizontal-movie-list']} >
            <ListHeader title={title} buttonText={buttonText} />
            <ul>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_1} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_2} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_3} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_4} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_5} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_6} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_7} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_8} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_9} /></li>
                <li><MoviePoster posterImageUrl={assetsManager.moviePoster_10} /></li>
            </ul>
        </div>
    );
}

export default HorizontalMovieList;