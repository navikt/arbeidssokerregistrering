import * as utils from '../../../utils';
import * as skjemaVerdier from '../../../fixtures/registrering-sykefravaer-valg.json';


describe('/skjema-sykefravaer/3/3 - Er det noe annet enn helsen din som NAV bør ta hensyn til?', () => {
    beforeEach(() => {
        utils.configureCypress('registrering-sykefravaer');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        utils.clickOptionThenNext(2); // Velg "Jeg trenger ny jobb"
        utils.clickOptionThenNext(0); // Velg "Ingen utdanning"
    });
    utils.stdStegTest(skjemaVerdier[3]);
    it('Går videre til /oppsummering ved klikk på NESTE', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(0)
            .click();
        cy.get('[data-testid="neste"]')
            .should('have.attr', 'href', '/oppsummering')
            .click();
        cy.get('[class="typo-innholdstittel oppsummering-tittel"]')
            .should('contain', 'Dine opplysninger');
    });
});