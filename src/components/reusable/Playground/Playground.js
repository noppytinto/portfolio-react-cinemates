import styles from './Playground.module.css';
import HorizontalMovieList from '../../ExplorePage/HorizontalMoviesList/HorizontalMovieList';
import ListHeader from '../../ExplorePage/HorizontalMoviesList/ListHeader/ListHeader';
import MoviePoster from '../../reusable/MoviePoster/MoviePoster';
import OutlineButton from '../../reusable/OutlineButton/OutlineButton';
import * as assetsManager from '../../../utils/AssetsManager';

function Playground() {
    return (
        <div className={styles.App}>
            <h1>Header</h1>
            <OutlineButton>Outlined Button</OutlineButton>

            <ListHeader title='Up next' buttonText='See all' />
            <MoviePoster posterImageUrl={assetsManager.moviePoster_11} />
            <br /><br />
            <HorizontalMovieList />
        </div>
    );
}

export default Playground;
