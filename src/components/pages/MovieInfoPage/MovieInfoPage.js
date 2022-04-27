import styles from './MovieInfoPage.module.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {fetchMovie} from '../../../services/movieDatabaseService';

function MovieInfoPage() {
    const classes = `${styles['movie-info-page']} `;
    const params = useParams();
    const movieId = params.id;
    const [movie, setMovie] = useState({});

    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////
    // fetch movie details
    useEffect(() => {
        (async () => {
            const fetched = await fetchMovie(movieId);
            // console.log('MOVIE', fetched);
            setMovie(fetched);
        })();
    }, [setMovie, movieId]);


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (
        <div className={classes}>
            <HeaderWithBackButton className={`${styles['movie-info-page__header']}` }
                                  title={''}/>
            <div className={`${styles['movie-info-page__backdrop-container']}` }>
                <div  className={`${styles['movie-info-page__gradient']}` }></div>
                <img  className={`${styles['movie-info-page__backdrop']}` }
                      src={movie.backdropUrl}
                      alt={movie.title} />
                <h1 className={`${styles['movie-info-page__title']}` }>
                    {movie.title}
                </h1>
            </div>

        </div>
    );
}// MovieInfoPage

export default MovieInfoPage;