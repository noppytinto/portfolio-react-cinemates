describe('explore page', () => {
    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        cy.viewport('iphone-x');
    })

    it('successfully loads', () => {
        cy.visit('http://localhost:3000')
    })
})
