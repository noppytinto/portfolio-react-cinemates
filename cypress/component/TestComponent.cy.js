import React from 'react';
// import App from '../../src/App';
import MoviePoster from '../../src/components/reusable/MoviePoster/MoviePoster';
const titleSelector = '[data-testid=title]'
const imageSelector = '[data-testid=image]'

describe('MoviePoster.cy.js', () => {

    beforeEach(() => {
        cy.viewport(300, 500);
    });


    it('renders successfully', () => {
        cy.mount(
            <MoviePoster />
        );
    })

    it('renders title successfully', () => {
        const title = 'test';

        cy.mount(
            <MoviePoster movieTitle={title}
            />

        );

        cy.get(titleSelector)
            .should('contain.text', title);
    })

    it('renders broken image successfully', () => {
        const url = '/images/icons/broken_image_black_24dp.svg';

        cy.mount(
            <MoviePoster movieTitle={'test'}/>
        );

        cy.get(titleSelector)
        .should('contain.text', 'test');
        cy.get(imageSelector)
            .invoke('attr', 'src')
            .should('eq', url);
    })

    it('renders image successfully', () => {
        const url = 'https://www.themoviedb.org/t/p/w1280/cdkyMYdu8ao26XOBvilNzLneUg1.jpg';

        cy.mount(
            <MoviePoster movieTitle={'test'}
                         posterImageUrl={url} />
        );

        cy.get(imageSelector)
            .invoke('attr', 'src')
            .should('eq', url);
    })

})//