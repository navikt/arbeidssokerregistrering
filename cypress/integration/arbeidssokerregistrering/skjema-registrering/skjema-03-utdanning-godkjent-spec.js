import * as utils from '../../../utils';
import * as skjemaVerdier from '../../../fixtures/ordinaerregistrering-valg.json';


describe('/skjema/3 - Er utdanningen din godkjent i Norge?', () => {
    beforeEach(() => {
        utils.configureCypress('registering');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        utils.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        utils.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        utils.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
    });
    utils.stdStegTest(skjemaVerdier[2]);
    it('Går videre til skjema/4 ved klikk på NESTE', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(0)
            .click();
        cy.get('[data-testid="neste"]')
            .should('have.attr', 'href', '/skjema/4')
            .click();
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Er utdanningen din bestått?');
    });
});