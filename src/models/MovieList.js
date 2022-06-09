class MovieList {
    owner;
    movies;
    name;

    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.movies = [];
    }

    addMovie(movie) {
        movies.push(movie);
    }
}