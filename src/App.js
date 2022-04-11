import styles from './App.module.css';
import HorizontalMovieList from './components/HorizontalMoviesList/HorizontalMovieList';
import ListHeader from './components/HorizontalMoviesList/ListHeader/ListHeader';
import MoviePoster from './components/reusable/MoviePoster/MoviePoster';
import OutlineButton from './components/reusable/OutlineButton/OutlineButton';
import * as assetsManager from './utils/AssetsManager';

function App() {
    return (
        <div className={styles.App}>
            <h1>Header</h1>
            <OutlineButton>Button</OutlineButton>

            <ListHeader title='Up next' buttonText='See all' />
            <ListHeader title='Coming Soon' buttonText='See all' />
            <MoviePoster posterImageUrl={assetsManager.moviePoster_11}/>
            <br/><br/>
            <HorizontalMovieList />
        </div>
    );
}

export default App;
