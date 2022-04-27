import * as assetsManager from "../utils/assets-manager";
import MovieBuilder from "../models/MovieBuilder";

const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const API_KEY = '632f90b0d342606c53a9ffd5fc5ed32e';
const DEFAULT_LANG = 'en';
const DEFAULT_REGION = 'it';
const PAGE_QUERY = '&page=';

const PATH_MOVIE = '/movie';
const PATH_UPCOMING = '/upcoming';
const PATH_POPULAR = '/popular';
const PATH_NOW_PLAYING = '/now_playing';

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
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w342';
const BASE_URL_BACKDROP = 'https://image.tmdb.org/t/p/w780';
const QUERIES = `&language=${DEFAULT_LANG}&region=${DEFAULT_REGION}`;
const PARAM_LANGUAGE = `&language=`;
// const PARAM_REGION = `&region=`;
const LANG_ENGLISH = `en`;
// const LANG_ITALIAN = `it`;
const URL_UPCOMING = `${BASE_URL_TMDB}${PATH_MOVIE}${PATH_UPCOMING}?api_key=${API_KEY}${QUERIES}`;
const URL_POPULAR = `${BASE_URL_TMDB}${PATH_MOVIE}${PATH_POPULAR}?api_key=${API_KEY}${QUERIES}`;
const URL_NOW_PLAYING = `${BASE_URL_TMDB}${PATH_MOVIE}${PATH_NOW_PLAYING}?api_key=${API_KEY}${QUERIES}`;
const URL_MOVIE_INFO = `${BASE_URL_TMDB}${PATH_MOVIE}/`;

export async function getUpcoming(page = 1) {
    try {
        const [rawMovies, totalPages] = await fetchMovies(URL_UPCOMING, page);
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
        const [rawMovies, totalPages] = await fetchMovies(URL_NOW_PLAYING, page);
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
        const [rawMovies, totalPages] = await fetchMovies(URL_POPULAR, page);
        if (!rawMovies) throw new Error('');

        //
        const movies = buildMovies(rawMovies);
        return [movies, totalPages];
    } catch (err) {
        console.log('FETCH UPCOMING ERROR: ', err);
        return [];
    }
}

export async function fetchMovie(movieId) {
    try {
        const res = await fetch(`${URL_MOVIE_INFO}/${movieId}?api_key=${API_KEY}${PARAM_LANGUAGE}${LANG_ENGLISH}`);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();

        const movie = buildFullMovie(data);
        return movie;
    } catch (err) {
        console.log('FETCH ERROR: ', err);
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
        const movie = buildSimpleMovie(rawMovie);
        movies.push(movie);
    });

    return movies;

}

function buildSimpleMovie(jsonObj) {
    const id = jsonObj.id;
    const title = jsonObj.title;
    const posterUrl = buildImageUrl(jsonObj['poster_path']);
    const overview = jsonObj.overview;
    const releaseDate = jsonObj['release_date'];

    return new MovieBuilder(id, title)
        .setPosterUrl(posterUrl)
        .setOverview(overview)
        .setReleaseDate(releaseDate)
        .build();
}

function buildFullMovie(jsonObj) {
    const id = jsonObj.id;
    const title = jsonObj.title;
    const posterUrl = buildImageUrl(jsonObj['poster_path']);
    const overview = jsonObj.overview;
    const releaseDate = jsonObj['release_date'];
    const backdropUrl = buildBackdropUrl(jsonObj['backdrop_path']);
    const genres = jsonObj.genres;
    const duration = jsonObj.runtime;
    const status = jsonObj.status;

    return new MovieBuilder(id, title)
        .setPosterUrl(posterUrl)
        .setOverview(overview)
        .setReleaseDate(releaseDate)
        .setBackdropUrl(backdropUrl)
        .setGenres(genres)
        .setReleaseDate(releaseDate)
        .setDuration(duration)
        .setStatus(status)
        .build();
}

function buildImageUrl(path) {
    if(!Boolean(path)) return assetsManager.iconBrokenImage;
    return BASE_URL_IMAGE + path;
}
function buildBackdropUrl(path) {
    if(!Boolean(path)) return assetsManager.iconBrokenImage;
    return BASE_URL_BACKDROP + path;
}