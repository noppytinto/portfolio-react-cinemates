import * as assets from "../utils/assets-manager";
import MovieBuilder from "../models/MovieBuilder";
import CastMember from "../models/CastMember";

const BASE_URL_TMDB = 'https://api.themoviedb.org/3';
const API_KEY = '632f90b0d342606c53a9ffd5fc5ed32e';
const DEFAULT_LANG = 'en';
const DEFAULT_REGION = 'it';
const PAGE_QUERY = '&page=';

const PATH_MOVIE = '/movie';
const PATH_UPCOMING = '/upcoming';
const PATH_POPULAR = '/popular';
const PATH_NOW_PLAYING = '/now_playing';
const PATH_CREDITS = '/credits';
const PATH_SEARCH = '/search/movie';

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
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w185';
const BASE_URL_BACKDROP = 'https://image.tmdb.org/t/p/w780';
const BASE_URL_CREDITS = 'https://image.tmdb.org/t/p/w300';
const QUERIES = `&language=${DEFAULT_LANG}&region=${DEFAULT_REGION}`;
const PARAM_LANGUAGE = `&language=`;
// const PARAM_REGION = `&region=`;
const LANG_ENGLISH = `en`;
// const LANG_ITALIAN = `it`;
const URL_UPCOMING = `${BASE_URL_TMDB}${PATH_MOVIE}${PATH_UPCOMING}?api_key=${API_KEY}${QUERIES}`;
const URL_POPULAR = `${BASE_URL_TMDB}${PATH_MOVIE}${PATH_POPULAR}?api_key=${API_KEY}${QUERIES}`;
const URL_NOW_PLAYING = `${BASE_URL_TMDB}${PATH_MOVIE}${PATH_NOW_PLAYING}?api_key=${API_KEY}${QUERIES}`;
const URL_MOVIE_INFO = `${BASE_URL_TMDB}${PATH_MOVIE}/`;
// const URL_SEARCH_MOVIE = `${BASE_URL_TMDB}${PATH_MOVIE}/`;

const expiration = 86_400_000; // 1 day


//////////////////////////////////////
//
//////////////////////////////////////
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

export async function searchMovies(query, page = 1) {
    try {
        const [rawMovies, totalPages] = await queryMovies(query, page);
        if (!rawMovies) throw new Error('');

        //
        const movies = buildMovies(rawMovies);
        return [movies, totalPages];
    } catch (err) {
        console.log('SEARCH ERROR: ', err);
        return [];
    }
}


//////////////////////////////////////
// FETCHERS
//////////////////////////////////////
export async function fetchMovie(movieId) {
    const finalUrl = `${URL_MOVIE_INFO}/${movieId}?api_key=${API_KEY}${PARAM_LANGUAGE}${LANG_ENGLISH}`;
    let data = null;

    try {
        const cachedData = localStorage.getItem(finalUrl);
        if (cachedData && _cachedDataIsStillValid(finalUrl)) {
            console.log('USING CACHED DATA of: ', finalUrl);
            data = JSON.parse(cachedData);
        }
        else {
            const res = await fetch(finalUrl);
            if (!res.ok) throw new Error(res.status);
            data = await res.json();
            _cacheRequestData(finalUrl, data);
        }

        //
        const movie = buildFullMovie(data);
        return movie;
    } catch (err) {
        console.log('FETCH ERROR: ', err);
        return {};
    }
}

async function fetchMovies(url, page=1) {
    const finalUrl = url + PAGE_QUERY  + `${page}`;
    let data = null;

    try {
        const cachedData = localStorage.getItem(finalUrl);
        if (cachedData && _cachedDataIsStillValid(finalUrl)) {
            console.log('USING CACHED DATA of: ', finalUrl);
            data = JSON.parse(cachedData);
        }
        else {
            const res = await fetch(finalUrl);
            if (!res.ok) throw new Error(res.status);
            data = await res.json();
            _cacheRequestData(finalUrl, data);
        }

        //
        const results = data.results;
        const totalPages = data['total_pages'];

        return [results, totalPages];
    } catch (err) {
        console.log('FETCH ERROR: ', err);
        return [];
    }
}

async function queryMovies(query, page) {
    const finalUrl = `${BASE_URL_TMDB}${PATH_SEARCH}?api_key=${API_KEY}&language=en&query=${query}&page=${page}&include_adult=false&region=it`;
    let data = null;

    try {
        const cachedData = localStorage.getItem(finalUrl);
        if (cachedData && _cachedDataIsStillValid(finalUrl)) {
            console.log('USING CACHED DATA of: ', finalUrl);
            data = JSON.parse(cachedData);
        }
        else {
            const res = await fetch(finalUrl);
            if (!res.ok) throw new Error(res.status);
            data = await res.json();
            _cacheRequestData(finalUrl, data);
        }

        //
        const results = data.results;
        const totalPages = data['total_pages'];
        return [results, totalPages];
    } catch (err) {
        console.log('FETCH ERROR: ', err);
        return [];
    }
}

export async function fetchCast(movieId) {
    const finalUrl = `${BASE_URL_TMDB}${PATH_MOVIE}/${movieId}${PATH_CREDITS}?api_key=${API_KEY}${PARAM_LANGUAGE}${LANG_ENGLISH}`;
    let data = null;

    try {
        const cachedData = localStorage.getItem(finalUrl);
        if (cachedData && _cachedDataIsStillValid(finalUrl)) {
            console.log('USING CACHED DATA of: ', finalUrl);
            data = JSON.parse(cachedData);
        }
        else {
            const res = await fetch(finalUrl);
            if (!res.ok) throw new Error(res.status);
            data = await res.json();
            _cacheRequestData(finalUrl, data);
        }

        const cast = buildCredits(data.cast);
        return cast;
    } catch (err) {
        console.log('FETCH ERROR: ', err);
        return [];
    }
}


//////////////////////////////////////
// MISC
//////////////////////////////////////
function _cacheRequestData(key, requestData) {
    localStorage.setItem(key, JSON.stringify(requestData));
    localStorage.setItem('date-' + key, Date.now());
}

function _cachedDataIsStillValid(key) {
    const fetchDateInMillis =  localStorage.getItem('date-' + key);
    const currentDateInMillis = Date.now();

    const diff = currentDateInMillis - fetchDateInMillis;

    return diff < expiration;
}


//////////////////////////////////////
// BUILDERS
//////////////////////////////////////
function buildCredits(rawData) {
    const cast = [];

    rawData.forEach(rawCastMember => {
        const castMember = buildSimpleCastMember(rawCastMember);
        cast.push(castMember);
    });

    return cast;

}

function buildSimpleCastMember(jsonObj) {
    const id = jsonObj.id;
    const name = jsonObj.name;
    const profilePictureUrl = buildProfilePictureUrl(jsonObj['profile_path']);
    const character = jsonObj.character;

    const member = new CastMember(id, name);
    member.setProfilePictureUrl(profilePictureUrl);
    member.setCharacter(character);
    return member;
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
    const genres = buildGenres(jsonObj.genres);
    const duration = jsonObj.runtime;
    const status = jsonObj.status;
    const cast = jsonObj.cast;

    return new MovieBuilder(id, title)
        .setPosterUrl(posterUrl)
        .setOverview(overview)
        .setReleaseDate(releaseDate)
        .setBackdropUrl(backdropUrl)
        .setGenres(genres)
        .setReleaseDate(releaseDate)
        .setDuration(duration)
        .setStatus(status)
        .setCast(cast)
        .build();
}

function buildGenres(genres) {
    let result = [];

    genres.forEach((gen) => {
        result.push(`${gen.name}`)
    })

    return result;
}

function buildImageUrl(path) {
    if(!Boolean(path)) return '';
    return BASE_URL_IMAGE + path;
}

function buildProfilePictureUrl(path) {
    if(!Boolean(path)) return '';
    return BASE_URL_CREDITS + path;
}

function buildBackdropUrl(path) {
    if(!Boolean(path)) return '';
    return BASE_URL_BACKDROP + path;
}