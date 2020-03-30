import * as utils from '../../../utils';


describe('Avbryt-modal', () => {
    beforeEach(() => {
        utils.configureCypress('registrering-sykefravaer');
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
    });
    it('Viser modal ved klikk på "Avbryt Registreringen"', () => {
        cy.get('[class="lenke-avbryt-wrapper"]')
            .click();
        cy.get('div[aria-label="Avbryt registrering"]')
            .should('contain', 'Er du sikker på at du vil avbryte?');
    });
    it('Navigerer tilbake til startside ved klikk på "Avbryt Registreringen"', () => {
        cy.get('[class="lenke-avbryt-wrapper"]')
            .click();
        cy.get('div[aria-label="Avbryt registrering"]')
            .should('contain', 'Er du sikker på at du vil avbryte?');
        cy.get('button')
            .eq(0)
            .should('contain', 'Ja, avbryt')
            .click();
        cy.get('[class="typo-sidetittel"]')
            .should('contain', 'Mer veiledning fra NAV');
    });
    it('Lukker modal ved klikk på "Nei"', () => {
        cy.get('[class="lenke-avbryt-wrapper"]')
            .click();
        cy.get('div[aria-label="Avbryt registrering"]')
            .should('contain', 'Er du sikker på at du vil avbryte?');
        cy.get('button')
            .eq(1)
            .should('contain', 'Nei')
            .click();
        cy.get('form[class="spm-skjema"')
            .should('contain', 'Hva tenker du om din fremtidige situasjon?');
    });
});