import styles from './ExplorePage.module.css';
import HorizontalMovieList from "./HorizontalMoviesList/HorizontalMovieList";
import {useEffect, useState} from "react";
import {getUpcomings, getPopular, getNowPlaying} from '../../services/movieDatabaseService';

function ExplorePage() {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        getNowPlaying((data) => {
            setNowPlayingMovies(data);
        });

        getUpcomings((data) => {
            setUpcomingMovies(data);
        });

        getPopular((data) => {
            setPopularMovies(data);
        });

    }, [])

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div className={`${styles['explore-page']}`}>
            <ul className={`${styles['explore-list']}`}>
                <li className={`${styles['explore-item']}`}>
                    <HorizontalMovieList title={'Now Playing'} buttonText={'See all'} movieList={nowPlayingMovies}/>
                </li>
                <li className={`${styles['explore-item']}`}>
                    <HorizontalMovieList title={'Upcoming'} buttonText={'See all'} movieList={upcomingMovies}/>
                </li>
                <li className={`${styles['explore-item']}`}>
                    <HorizontalMovieList title={'Popular'} buttonText={'See all'} movieList={popularMovies}/>
                </li>

            </ul>
        </div>
    );
}

export default ExplorePage;