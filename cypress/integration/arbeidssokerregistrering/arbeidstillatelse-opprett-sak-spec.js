import * as utils from '../../utils';

describe('/fullfor - Mangler arbeidstillatelse opprett sak', () => {
    beforeEach(() => {
        utils.configureCypress('arbeidstillatelse-opprett-sak');
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
        cy.get('[class="skjemaelement__label"]')
            .click();
        cy.get('[data-testid="neste"')
            .click();
        cy.get('[class="typo-systemtittel avbryt-modal__beskrivelse blokk-m"]')
            .should('contain', 'En veileder må hjelpe deg slik at du blir registrert')
    });
    it('TA KONTAKT - Knapp vises', () => {
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]')
            .should('exist');
    });
    it('TA KONTAKT - Oppretter sak - Henvendelse mottatt', () => {
        cy.route('POST', '/veilarbregistrering/api/oppgave', {})
            .as('opprettSak');
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]')
            .click();
        cy.wait('@opprettSak')
            .its('request.body')
            .should('deep.equal', { oppgaveType: 'OPPHOLDSTILLATELSE' });
        cy.get('[class="typo-systemtittel blokk-m"]')
            .should('contain', 'Henvendelse mottatt / Request received');
        cy.get('[class="typo-normal blokk-m"]>a')
            .eq(0)
            .should('have.attr', 'href', 'https://brukerprofil.difi.no/minprofil?locale=nb');
        cy.get('[class="typo-normal blokk-m"]>a')
            .eq(1)
            .should('have.attr', 'href', 'https://brukerprofil.difi.no/minprofil?locale=en');
    });
    it('TA KONTAKT - Oppretter sak - Feilmelding', () => {
        cy.route({
            method: 'POST',
            url: '/veilarbregistrering/api/oppgave',
            status: 500,
            response: {}
        });
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
        cy.get('[class="skjemaelement__label"]')
            .click();
        cy.get('[data-testid="neste"')
            .click();
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]')
            .click();
        cy.get('[class="typo-systemtittel blokk-m"')
            .should('contain', 'Noe gikk galt / We\'re having trouble')
    });
    it('TA KONTAKT - Oppretter sak - Vennligst vent', () => {
        cy.route({
            method: 'POST',
            url: '/veilarbregistrering/api/oppgave',
            status: 403,
            response: {}
        });
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
        cy.get('[class="skjemaelement__label"]')
            .click();
        cy.get('[data-testid="neste"')
            .click();
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]')
            .click();
        cy.get('[class="typo-systemtittel blokk-m"]')
            .should('contain', 'Vennligst vent / Please wait');
        cy.get('[class="typo-normal blokk-m"]>a')
            .eq(0)
            .should('have.attr', 'href', 'https://brukerprofil.difi.no/minprofil?locale=nb');
        cy.get('[class="typo-normal blokk-m"]>a')
            .eq(1)
            .should('have.attr', 'href', 'https://brukerprofil.difi.no/minprofil?locale=en');

    });
});
