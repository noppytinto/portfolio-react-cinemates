import React from 'react';
// import App from '../../src/App';
import CastCard from '../../src/components/reusable/CastCard/CastCard';
const nameSelector = '[data-testid=name]'
const imageSelector = '[data-testid=image]'

describe('CastCard.cy.js', () => {

    beforeEach(() => {
        cy.viewport(300, 500);
    });


    it('renders successfully', () => {
        cy.mount(
            <CastCard />
        );
    })

    it('renders name successfully', () => {
        const name = 'foo';

        cy.mount(
            <CastCard name={name}/>
        );

        cy.get(nameSelector)
            .should('contain.text', name);
    })

    it('renders broken image successfully', () => {
        const url = '/images/icons/broken_image_black_24dp.svg';

        cy.mount(
            <CastCard name={'foo'}/>
        );

        cy.get(nameSelector)
            .should('contain.text', 'foo');
        cy.get(imageSelector)
            .invoke('attr', 'src')
            .should('eq', url);
    })

    it('renders image successfully', () => {
        const url = 'https://www.themoviedb.org/t/p/w1280/cdkyMYdu8ao26XOBvilNzLneUg1.jpg';

        cy.mount(
            <CastCard name={'foo'}
                      imageUrl={url} />
        );

        cy.get(imageSelector)
            .invoke('attr', 'src')
            .should('eq', url);
    })

})//