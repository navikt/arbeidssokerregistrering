describe('FEATURE TOGGLE - Nedetid', () => {
    beforeEach(() => {
        cy.configure('nedetid');
    });
    it('Informasjon om nedetid vises', () => {
        cy.visit('/');
        cy.get('[class="tjeneste-oppdateres__info"]')
            .should('contain', 'Arbeidssøkerregistrering er utilgjengelig grunnet teknisk vedlikehold. Vi ber deg prøve igjen om en time.');
    });
});