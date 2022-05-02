class CastMember {
    id;
    name;
    character;
    profilePictureUrl;
    movies;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    setCharacter(character='') {
        this.character = character;
    }

    setProfilePictureUrl(url='') {
        this.profilePictureUrl = url;
    }

    setMovies(movies=[]) {
        this.movies = movies;
    }
}// CastMember

export default CastMember;