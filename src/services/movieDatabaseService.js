import Movie from "../models/Movie";
import * as assetsManager from "../utils/assets-manager";

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '632f90b0d342606c53a9ffd5fc5ed32e';
const LANGUAGE = 'en';
const REGION = 'it';
const PAGE_QUERY = '&page=';

const MOVIE_PATH = '/movie';
const UPCOMING_PATH = '/upcoming';
const POPULAR_PATH = '/popular';
const NOW_PLAYING_PATH = '/now_playing';

// poster sizes:
// "w92",
// "w154",
// "w185",
// "w342",
// "w500",
// "w780",
// "original"
//
// backdrop sizes
// "w300",
// "w780",
// "w1280",
// "original"
//
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';
const QUERIES = `&language=${LANGUAGE}&region=${REGION}`;
const UPCOMING_URL = `${TMDB_BASE_URL}${MOVIE_PATH}${UPCOMING_PATH}?api_key=${API_KEY}${QUERIES}`;
const POPULAR_URL = `${TMDB_BASE_URL}${MOVIE_PATH}${POPULAR_PATH}?api_key=${API_KEY}${QUERIES}`;
const NOW_PLAYING_URL = `${TMDB_BASE_URL}${MOVIE_PATH}${NOW_PLAYING_PATH}?api_key=${API_KEY}${QUERIES}`;

export async function getUpcoming(page = 1) {
    try {
        const [rawMovies, totalPages] = await fetchMovies(UPCOMING_URL, page);
        if (!rawMovies) throw new Error('');

        //
        const movies = buildMovies(rawMovies);
        return [movies, totalPages];
    } catch (err) {
        console.log('FETCH UPCOMING ERROR: ', err);
        return [];
    }
}

export async function getNowPlaying(page = 1) {
    try {
        const [rawMovies, totalPages] = await fetchMovies(NOW_PLAYING_URL, page);
        if (!rawMovies) throw new Error('');

        //
        const movies = buildMovies(rawMovies);
        return [movies, totalPages];
    } catch (err) {
        console.log('FETCH UPCOMING ERROR: ', err);
        return [];
    }
}

export async function getPopular(page = 1) {
    try {
        const [rawMovies, totalPages] = await fetchMovies(POPULAR_URL, page);
        if (!rawMovies) throw new Error('');

        //
        const movies = buildMovies(rawMovies);
        return [movies, totalPages];
    } catch (err) {
        console.log('FETCH UPCOMING ERROR: ', err);
        return [];
    }
}

async function fetchMovies(url, page=1) {
    try {
        const res = await fetch(url + PAGE_QUERY  + `${page}`);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();

        const results = data.results;
        const totalPages = data['total_pages'];

        return [results, totalPages];
    } catch (err) {
        console.log('FETCH ERROR: ', err);
        return [];
    }
}

function buildMovies(rawData) {
    const movies = [];

    rawData.forEach(rawMovie => {
        const movie = buildMovie(rawMovie);
        movies.push(movie);
    });

    return movies;

}

function buildMovie(jsonObj) {
    const id = jsonObj.id;
    const title = jsonObj.title;
    const posterUrl = buildImageUrl(jsonObj['poster_path']);
    const overview = jsonObj.overview;
    const releaseDate = jsonObj['release_date'];

    return new Movie(id, title, posterUrl, overview, releaseDate);
}

function buildImageUrl(imagePath) {
    if(!Boolean(imagePath)) return assetsManager.iconBrokenImage;
    return IMAGE_BASE_URL + imagePath;
}