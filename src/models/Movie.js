export default class Movie {
    id;
    title;
    posterUrl;
    overview;
    releaseDate;

    constructor(id, title, posterUrl, overview, releaseDate) {
        this.id = id ?? '';
        this.title = title ?? '';
        this.posterUrl = posterUrl ?? '';
        this.overview = overview ?? '(description not available)';
        this.releaseDate = releaseDate ?? '(not available)';
    }
}