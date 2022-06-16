import MoviePoster from '../../../reusable/MoviePoster/MoviePoster';
import styles from './HorizontalMovieList.module.scss';
import ListHeader from './ListHeader/ListHeader';
import {NavLink} from "react-router-dom";

import * as assets from '../../../../utils/assets-manager';

function HorizontalMovieList({
                                 title = 'Header',
                                 movies = [],
                                 buttonText = 'Button',
                                 seeAllUrl = '/',
                                 seeAllData = {}
                             }) {


    ///////////////////////////////
    // FUNCTIONS
    ///////////////////////////////
    function spawnMoviePoster(movie) {
        return (
            <li className={styles['list-item']} key={movie.id}>
                <NavLink className={styles['movie-poster-link']}
                         to={`${assets.pathMovieInfoPage}/${movie.id}`}>

                    <MoviePoster className={styles['movie-poster']}
                                 posterImageUrl={movie.posterUrl}
                                 alt={movie.title}
                                 movieTitle={movie.title}
                                 lazy={true}
                    />
                                 
                </NavLink>
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