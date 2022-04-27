import Movie from "./Movie";

export default class MovieBuilder {
    id;
    title;
    posterUrl;
    overview;
    releaseDate;
    backdropUrl;
    genres;
    status;
    duration;

    constructor(id='', title='') {
        this.id = id;
        this.title = title;
    }

    setPosterUrl(url='') {
        this.posterUrl = url;
        return this;
    }

    setOverview(str='(overview not avalaible)') {
        this.overview = str;
        return this;
    }

    setReleaseDate(str='(not available)') {
        this.releaseDate = str;
        return this;
    }

    setBackdropUrl(url='') {
        this.backdropUrl = url;
        return this;
    }

    setGenres(genres=[]) {
        this.genres = genres;
        return this;
    }

    setStatus(str='(not available)') {
        this.status = str;
        return this;
    }

    setDuration(duration='(not available)') {
        this.duration = duration;
        return this;
    }

    build() {
        return new Movie(this);
    }
}// MovieBuilder