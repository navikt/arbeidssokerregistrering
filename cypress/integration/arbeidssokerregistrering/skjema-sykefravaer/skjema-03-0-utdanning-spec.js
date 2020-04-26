import * as skjemaVerdier from '../../../fixtures/registrering-sykefravaer-valg.json';


describe('skjema-sykefravaer/3/0 - Hva er din høyeste fullførte utdanning?', () => {
    beforeEach(() => {
        cy.configure('registrering-sykefravaer');
    });
    it('Navigerer til korrekt steg', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        cy.clickOptionThenNext(2); // Velg "Jeg trenger ny jobb"
    });
    it('Tester alle valg', () => {
        cy.stegTest(skjemaVerdier[2])
    });
    it('Ingen utdanning - Navigerer til /skjema-sykefravaer/3/3', () => {
        cy.clickOptionThenNext(0); // Velg "Ingen utdanning"
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Er det noe annet enn helsen din som NAV bør ta hensyn til?');
        cy.go('back');
    });
    it('Grunnskole - Navigerer til /skjema-sykefravaer/3/0', () => {
        cy.clickOptionThenNext(1); // Velg "Grunnskole"
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Er utdanningen din godkjent i Norge?');
        cy.go('back');
    });
    it('Videregående grunnutdanning (1 til 2 år) - Navigerer til /skjema-sykefravaer/3/0', () => {
        cy.clickOptionThenNext(2); // Velg "Videregående grunnutdanning (1 til 2 år)"
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Er utdanningen din godkjent i Norge?');
        cy.go('back');
    });
    it('Videregående, fagbrev eller svennebrev (3 år eller mer) - Navigerer til /skjema-sykefravaer/3/0', () => {
        cy.clickOptionThenNext(3); // Velg "Videregående, fagbrev eller svennebrev (3 år eller mer)"
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Er utdanningen din godkjent i Norge?');
        cy.go('back');
    });
    it('Høyere utdanning (1 til 4 år) - Navigerer til /skjema-sykefravaer/3/0', () => {
        cy.clickOptionThenNext(3); // Velg "Høyere utdanning (1 til 4 år)"
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Er utdanningen din godkjent i Norge?');
        cy.go('back');
    });
    it('Høyere utdanning (5 år eller mer)- Navigerer til /skjema-sykefravaer/3/0', () => {
        cy.clickOptionThenNext(4); // Velg "Høyere utdanning (5 år eller mer)
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Er utdanningen din godkjent i Norge?');
        cy.go('back');
    });
});