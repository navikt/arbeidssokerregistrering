describe('Feilmelding vises ved feil i lasting av data', () => {
    beforeEach(() => {
        cy.configure('sperret');
    });
    it('/ikke-arbeidssoker-utenfor-oppfolging - riktig side vises', () => {
        cy.visit('/');
        cy.get('[class="typo-normal alertstripe__tekst"]')
            .should('contain', 'Du er ikke registrert som arbeidssøker. Vi må hjelpe deg videre i andre kanaler.')
    });
    it('Jeg har blitt arbeidsledig og skal søke dagpenger - Viser info', () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(0)
            .should('contain', 'Jeg har blitt arbeidsledig og skal søke dagpenger')
            .click();
        cy.get('[id="dagpenger-result"]')
            .should('have.attr', 'class', 'show-result-text');
    });
    it('Jeg har søkt eller skal søke arbeidsavklaringspenger (AAP) - Viser info', () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(1)
            .should('contain', 'Jeg har søkt eller skal søke arbeidsavklaringspenger (AAP)')
            .click();
        cy.get('[id="aap-sok-result"]')
            .should('have.attr', 'class', 'show-result-text');
    });
    it('Jeg er sykmeldt men har ikke krav på sykepenger - Viser info', () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(2)
            .should('contain', 'Jeg er sykmeldt men har ikke krav på sykepenger')
            .click();
        cy.get('[id="sykepenger-slutt-result"]')
            .should('have.attr', 'class', 'show-result-text');
    });
    it('Jeg skal opprette CV eller jobbprofil - Viser info', () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(3)
            .should('contain', 'Jeg skal opprette CV eller jobbprofil')
            .click();
        cy.get('[id="cv-result"]')
            .should('have.attr', 'class', 'show-result-text');
    });
    it('Jeg har blitt arbeidsledig eller permittert og er usikker på rettighetene mine - Viser info', () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(4)
            .should('contain', 'Jeg har blitt arbeidsledig eller permittert og er usikker på rettighetene mine')
            .click();
        cy.get('[id="usikker-result"]')
            .should('have.attr', 'class', 'show-result-text');
    });
    it('Jeg er her av andre grunner - Viser info', () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(5)
            .should('contain', 'Jeg er her av andre grunner')
            .click();
        cy.get('[id="andre-result"]')
            .should('have.attr', 'class', 'show-result-text');
    });


});