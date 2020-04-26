describe('Avbryt-modal', () => {
    beforeEach(() => {
        cy.configure('registrering');
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
    });
    it('Viser modal ved klikk på "Avbryt Registreringen"', () => {
        cy.get('[class="lenke-avbryt-wrapper"]')
            .click();
        cy.get('div[aria-label="Avbryt registrering"]')
            .should('contain', 'Er du sikker på at du vil avbryte registreringen?');
    });
    it('Navigerer tilbake til startside ved klikk på "Avbryt Registreringen"', () => {
        cy.get('[class="lenke-avbryt-wrapper"]')
            .click();
        cy.get('div[aria-label="Avbryt registrering"]')
            .should('contain', 'Er du sikker på at du vil avbryte registreringen?');
        cy.get('button')
            .eq(0)
            .should('contain', 'Ja, avbryt')
            .click();
        cy.get('[class="registrering-arbeidssoker"]')
            .should('contain', 'Registrer deg som arbeidssøker');
    });
    it('Lukker modal ved klikk på "Nei"', () => {
        cy.get('[class="lenke-avbryt-wrapper"]')
            .click();
        cy.get('div[aria-label="Avbryt registrering"]')
            .should('contain', 'Er du sikker på at du vil avbryte registreringen?');
        cy.get('button')
            .eq(1)
            .should('contain', 'Nei')
            .click();
        cy.get('form[class="spm-skjema"')
            .should('contain', 'Velg den situasjonen som passer deg best');
    });
});