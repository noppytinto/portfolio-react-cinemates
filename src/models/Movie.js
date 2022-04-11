export default class Movie {
    #title;
    #posterUrl;
    #overview;

    constructor() {
        this.#title = '';
        this.#posterUrl = '';
        this.#overview = '(description not available)';
    }
}