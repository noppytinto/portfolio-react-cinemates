export default class Movie {
    id;
    title;
    posterUrl;
    overview;
    releaseDate;
    backdropUrl;
    genres;
    status;
    duration;

    constructor(builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.posterUrl = builder.posterUrl;
        this.overview = builder.overview;
        this.releaseDate = builder.releaseDate;
        this.backdropUrl = builder.backdropUrl;
        this.genres = builder.genres;
        this.status = builder.status;
        this.duration = builder.duration;
    }
}// Movie