
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_PATH = '/movie';
const UPCOMING_PATH = '/upcoming';
const POPULAR_PATH = '/popular';
const NOW_PLAYING_PATH = '/now_playing';
const API_KEY = '632f90b0d342606c53a9ffd5fc5ed32e';
const LANGUAGE = 'it';
const REGION = 'it';
const PAGE = '1';
const QUERIES = `&language=${LANGUAGE}&region=${REGION}&page=${PAGE}`;
const UPCOMING_URL = `${TMDB_BASE_URL}${MOVIE_PATH}${UPCOMING_PATH}?api_key=${API_KEY}${QUERIES}`;
const POPULAR_URL = `${TMDB_BASE_URL}${MOVIE_PATH}${POPULAR_PATH}?api_key=${API_KEY}${QUERIES}`;
const NOW_PLAYING_URL = `${TMDB_BASE_URL}${MOVIE_PATH}${NOW_PLAYING_PATH}?api_key=${API_KEY}${QUERIES}`;

export function getUpcomings(onSuccess) {
    fetch(UPCOMING_URL)
        .then((res) => {
            if ( ! res.ok) throw new Error(res.status);
            return res.json();
        }).then((data) => {
        onSuccess(data.results);
            // if (data) {
            //     console.log(data.results);
            // }
        }).catch( err => console.log('FETCH ERROR: ', err));
}

export function getPopular(onSuccess) {
    fetch(POPULAR_URL)
        .then((res) => {
            if ( ! res.ok) throw new Error(res.status);
            return res.json();
        }).then((data) => {
        onSuccess(data.results);
        // if (data) {
        //     console.log(data.results);
        // }
    }).catch( err => console.log('FETCH ERROR: ', err));
}

export function getNowPlaying(onSuccess) {
    fetch(NOW_PLAYING_URL)
        .then((res) => {
            if ( ! res.ok) throw new Error(res.status);
            return res.json();
        }).then((data) => {
        onSuccess(data.results);
        // if (data) {
        //     console.log(data.results);
        // }
    }).catch( err => console.log('FETCH ERROR: ', err));
}