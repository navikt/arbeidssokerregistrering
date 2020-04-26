describe('Feilmelding vises ved feil i lasting av data', () => {
    beforeEach(() => {
        cy.configure('feilmelding');
    })
    it('Tekst som vises er korrekt', () => {
        cy.visit('/');
        cy.get('[class="feilmelding__innhold"]')
            .should('contain', 'På grunn av feil i systemene våre kan du ikke registrere deg akkurat nå.')
    });
    it('Link til brukerstøtte er korrekt', () => {
        cy.visit('/');
        cy.get('[class="feilmelding__innhold"]>p>span>a')
            .should('have.attr', 'href').and('include', 'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/kontakt-teknisk-brukerstotte-nav.no');
    });
});