import * as skjemaVerdier from '../../../fixtures/registrering-sykefravaer-valg.json';


describe('/skjema-sykefravaer/1/0 - Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker??', () => {
    beforeEach(() => {
        cy.configure('registrering-sykefravaer');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        cy.clickOptionThenNext(0);
        cy.get('[class="typo-innholdstittel spm-tittel blokk-xxxl"]')
            .should('contain', 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?');
    });
    it('Alle valg har korrekt tekst', () => {
        skjemaVerdier[1].valg.forEach((tekst, i) => {
            cy.get('[class="alternativ-wrapper"]')
                .eq(i)
                .should('contain.any', tekst);
        });
    });
    it('Viser feilmelding ved klikk på NESTE hvis ingenting er valgt', () => {
        cy.get('[data-testid="neste"')
            .click()
        cy.get('[class="alertstripe spm-advarsel alertstripe--advarsel"]')
            .should('exist');
    });
    it('Alle valg kan velges', () => {
        skjemaVerdier[1].valg.forEach((_, i) => {
            cy.get('[class="alternativ-wrapper"]')
                .eq(i)
                .click();
            cy.get('[class="alternativ-wrapper"]>label>input')
                .eq(i)
                .should('have.attr', 'aria-checked', 'true')
        });
    });
    it('Ja, i full stilling - Navigerer til /infoside', () => {
        cy.clickOptionThenNext(0); // Velg "Ja, i full stilling"
        cy.get('[class="typo-systemtittel infoside--andre-rad__tittel"]')
            .should('contain', 'Fordi du skal tilbake i full jobb innen 52 uker');
        cy.go('back');
    });
    it('Ja, i redusert stilling - Navigerer til /oppsummering', () => {
        cy.clickOptionThenNext(1); // Velg "Ja, i redusert stilling"
        cy.get('[class="typo-innholdstittel oppsummering-tittel"]')
            .should('contain', 'Dine opplysninger');
        cy.go('back');
    });
    it('Usikker - Navigerer til /oppsummering', () => {
        cy.clickOptionThenNext(2); // Velg "Usikker"
        cy.get('[class="typo-innholdstittel oppsummering-tittel"]')
            .should('contain', 'Dine opplysninger');
        cy.go('back');
    });
    it('Nei - Navigerer til /oppsummering', () => {
        cy.clickOptionThenNext(2); // Velg "Nei"
        cy.get('[class="typo-innholdstittel oppsummering-tittel"]')
            .should('contain', 'Dine opplysninger');
        cy.go('back');
    });

});