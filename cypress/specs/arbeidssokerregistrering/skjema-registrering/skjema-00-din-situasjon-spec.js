import * as skjemaVerdier from '../../../fixtures/ordinaerregistrering-valg.json';


describe('/skjema/0 - Velg den situasjonen som passer deg best', () => {
    beforeEach(() => {
        cy.configure('registrering');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
    });
    it('Tester alle valg', () => {
        cy.stegTest(skjemaVerdier[0]);
    });
    it('Går rett videre til skjema/2 hvis ingen tidligere jobb og klikk på NESTE', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(3)
            .click();
        cy.get('[data-testid="neste"]')
            .should('have.attr', 'href', '/skjema/2')
            .click();
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Hva er din høyeste fullførte utdanning?');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
    });
    it('Går videre til skjema/1 hvis tidligere jobb og klikk på NESTE', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(5)
            .click();
        cy.get('[data-testid="neste"]')
            .should('have.attr', 'href', '/skjema/1')
            .click();
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Hva er din siste jobb?');
    });
});