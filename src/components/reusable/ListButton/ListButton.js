import styles from './ListButton.module.scss';
import * as assets from '../../../utils/assets-manager';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import {fetchMovie} from '../../../services/movie-database-service';

function ListButton(props) {
    const movies = props.movies ?? [];

    const title = props.title ?? '';
    const titleColor = props.titleColor ?? '#000';

    // console.log(movies);


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    // useEffect();

    // async function fetchPosters(movies) {
    //     if (!movieId) return;

    //     movies.forEach(async (movie) => {

    //     });
        
    // }



    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <button className={`${styles['list-button']} ${props.className}`}>
            <div className={`${styles['list-button__gradient']}`}></div>
            <div className={`${styles['list-button__info']}`}>
                {/* <img className={`${styles['list-button__poster-image']}`} 
                     src={movie.posterUrl} 
                     alt={movie.title} /> */}
                <p className={`${styles['list-button__title']}`}  style={{color: titleColor} }>{title}</p>

            </div>

            <ul className={`${styles['list-button__posters']}`}>

                {movies.map((movie) => {
                    // (async() => {
                    //     const movieData = await fetchMovie(movie.id);
                    //             console.log('movie data', movieData);
                    //             const posterUrl = movieData.posterUrl;
                    //             const movieTitle = movieData.title;


                    // })();

                    return (
                        <li key={uuidv4()} className={`${styles['list-button__poster']}`}>
                            <img className={`${styles['list-button__poster-image']}`} 
                                 src={movie.posterUrl} 
                                 alt={movie.title} />
                        </li>
                    );
                })}

            </ul>
        </button>
    );

}// ListButton

export default ListButton;