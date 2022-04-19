export default class Movie {
    id;
    title;
    posterUrl;
    overview;

    constructor(id, title, posterUrl, overview) {
        this.id = id ?? '';
        this.title = title ?? '';
        this.posterUrl = posterUrl ?? '';
        this.overview = overview ?? '(description not available)';
    }
}