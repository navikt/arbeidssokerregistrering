import * as utils from '../../../utils';


describe('FEATURE TOGGLE - Nedetid', () => {
    beforeEach(() => {
        utils.configureCypress('nedetid');
    });
    it('Informasjon om nedetid vises', () => {
        cy.visit('/');
        cy.get('[class="tjeneste-oppdateres__info"]')
            .should('contain', 'Arbeidssøkerregistrering er utilgjengelig grunnet teknisk vedlikehold. Vi ber deg prøve igjen om en time.');
    });
});