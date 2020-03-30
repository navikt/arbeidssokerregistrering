import * as utils from '../../../utils';

describe('/fullfor - Er opplysningene riktige?', () => {
    beforeEach(() => {
        utils.configureCypress('registrering');
    });
    it('Navigerer gjennom skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        utils.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        // Legger inn annen stilling enn allere lagret informasjon
        cy.get('[class="inaktiv-soke-input__input-felt--endre typo-normal"]')
            .click();
        cy.get('[id="stilling"]')
            .type('Klovn');
        cy.get('[id="resultat"]>li')
            .eq(1)
            .click();
        utils.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        utils.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
        cy.get('[data-testid="neste"')
            .click()
        cy.get('[class="typo-innholdstittel fullfor-tittel"')
            .should('contain', 'Fullfør registreringen');
    });
    it('Utvider "Les mer om kravene" ved klikk', () => {
        cy.get('[class="ekspanderbartPanel ekspanderbartPanel--lukket ekspanderbartPanel--border"]')
            .should('exist')
            .click();
        cy.get('[class="ekspanderbartPanel ekspanderbartPanel--apen ekspanderbartPanel--border"]')
            .should('exist');
    });
    it('Klikk på "FULLFØR" før krav lest og forstått viser feilmelding', () => {
        cy.get('[data-testid="neste"]')
            .click();
        cy.get('[class="alertstripe fullfor-advarsel-stripe alertstripe--advarsel"]')
            .should('exist')
            .should('contain.any', 'Du må huke av at du har lest og forstått kravene for å kunne fullføre registreringen.');
    });
    it('Klikk "Jeg har lest og forstått kravene', () => {
        cy.get('[class="skjemaelement__label"]')
            .click();
        cy.get('[class="bekreftCheckboksPanel fullfor-bekreft bekreftCheckboksPanel--checked"]')
            .should('exist');
    });
    it('Innhold i POST matcher skjemaverdier', () => {
        cy.get('[data-testid="neste"')
            .click();
        cy.fixture('startregistreringPost')
            .then(body => {
                cy.wait('@startRegistrering')
                    .its('request.body.besvarelse')
                    .should('deep.equal', body.besvarelse);
            });
        cy.get('[class="typo-systemtittel registrert__tittel"]')
            .should('contain', 'Du er nå registrert som arbeidssøker');
    });
    describe('/duernaregistrert - Du er nå registert som arbeidssøker', () => {
        it('Viser riktig side', () => {
            cy.get('[class="typo-systemtittel registrert__tittel"]')
                .should('contain', 'Du er nå registrert som arbeidssøker');
        });
    });
});
