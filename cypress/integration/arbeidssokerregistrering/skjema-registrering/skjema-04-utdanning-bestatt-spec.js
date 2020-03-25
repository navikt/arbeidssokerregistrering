import * as utils from '../../../utils';
import * as skjemaVerdier from '../../../fixtures/ordinaerregistrering-valg.json';


describe('/skjema/4 - Er utdanningen din bestått?', () => {
    beforeEach(() => {
        utils.configureCypress('registrering');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        utils.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        utils.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        utils.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
    });
    utils.stdStegTest(skjemaVerdier[3]);
    it('Går videre til skjema/5 ved klikk på NESTE', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(0)
            .click();
        cy.get('[data-testid="neste"]')
            .should('have.attr', 'href', '/skjema/5')
            .click();
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Har du helseproblemer som hindrer deg i å søke eller være i jobb?');
    });
});