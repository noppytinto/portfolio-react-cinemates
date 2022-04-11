import MoviePoster from '../reusable/MoviePoster/MoviePoster';
import styles from './HorizontalMovieList.module.css';
import ListHeader from './ListHeader/ListHeader';

function HorizontalMovieList({title='Header', movieList=[], buttonText='Button'}) {

    return (
        <div className={styles['horizontal-movie-list']} >
            <ListHeader title={title} buttonText={buttonText} />
            <ul>
                <li><MoviePoster /></li>
            </ul>
        </div>
    );
}

export default HorizontalMovieList;