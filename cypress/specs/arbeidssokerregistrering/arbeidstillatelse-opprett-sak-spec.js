describe("/fullfor - Mangler arbeidstillatelse opprett sak", () => {
    beforeEach(() => {
        cy.configure("arbeidstillatelse-opprett-sak");
    });
    it("Navigerer gjennom skjema", () => {
        cy.route("GET", "/veilarbregistrering/api/person/kontaktinfo", {});
        cy.visit("/");
        cy.get('[data-testid="start-registrering"]').click();
        cy.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        // Legger inn annen stilling enn allere lagret informasjon
        cy.get(
            '[class="inaktiv-soke-input__input-felt--endre typo-normal"]'
        ).click();
        cy.get('[id="stilling"]').type("Klovn");
        cy.get('[id="resultat"]>li').eq(1).click();
        cy.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        cy.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
        cy.get('[data-testid="neste"').click();
        cy.get('[class="skjemaelement__label"]').click();
        cy.get('[data-testid="neste"').click();
        cy.get(
            '[class="typo-systemtittel avbryt-modal__beskrivelse blokk-m"]'
        ).should("contain", "En veileder må hjelpe deg slik at du blir registrert");
    });
    it("TA KONTAKT - Knapp vises", () => {
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]')
            .should('exist');
    });
    it("TA KONTAKT - Oppretter sak - Henvendelse mottatt - Ingen kontaktinformasjon funnet", () => {
        cy.route("POST", "/veilarbregistrering/api/oppgave", {}).as("opprettSak");
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]').click();
        cy.wait('@opprettSak')
            .its('request.body')
            .should('deep.equal', { oppgaveType: "OPPHOLDSTILLATELSE" });
        cy.get('[data-testid=alertstripe]')
            .should('contain', 'Henvendelse mottatt / Request received');
        cy.get('[data-testid=ekstern-lenke-legg-inn-opplysninger]')
            .should('have.attr', 'href', 'https://www.nav.no/person/personopplysninger/#kontaktinformasjon');

    });
    it("TA KONTAKT - Oppretter sak - Henvendelse mottatt - Telefonnummer kun fra KRR", () => {
        cy.route("POST", "/veilarbregistrering/api/oppgave", {});
        cy.route("GET", "/veilarbregistrering/api/person/kontaktinfo", { telefonnummerHosKrr: "+47 22222222" });
        cy.visit("/");
        cy.get('[data-testid="start-registrering"]').click();
        cy.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        // Legger inn annen stilling enn allere lagret informasjon
        cy.get(
            '[class="inaktiv-soke-input__input-felt--endre typo-normal"]'
        ).click();
        cy.get('[id="stilling"]').type("Klovn");
        cy.get('[id="resultat"]>li').eq(1).click();
        cy.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        cy.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
        cy.get('[data-testid="neste"').click();
        cy.get('[class="skjemaelement__label"]').click();
        cy.get('[data-testid="neste"').click();
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]').click();
        cy.get('[data-testid=alertstripe]')
            .should('contain', 'Henvendelse mottatt / Request received');
        cy.get('[data-testid=kontaktinformasjonskort-krr]')
            .should('contain', '+47 22222222');
        cy.get('[data-testid=ekstern-lenke-endre-opplysninger]')
            .should('have.attr', 'href', 'https://www.nav.no/person/personopplysninger/#kontaktinformasjon');
    });
    it("TA KONTAKT - Oppretter sak - Henvendelse mottatt - Telefonnummer kun fra NAV", () => {
        cy.route("POST", "/veilarbregistrering/api/oppgave", {});
        cy.route("GET", "/veilarbregistrering/api/person/kontaktinfo", { telefonnummerHosNav: "+47 22222223" });
        cy.visit("/");
        cy.get('[data-testid="start-registrering"]').click();
        cy.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        // Legger inn annen stilling enn allere lagret informasjon
        cy.get(
            '[class="inaktiv-soke-input__input-felt--endre typo-normal"]'
        ).click();
        cy.get('[id="stilling"]').type("Klovn");
        cy.get('[id="resultat"]>li').eq(1).click();
        cy.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        cy.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
        cy.get('[data-testid="neste"').click();
        cy.get('[class="skjemaelement__label"]').click();
        cy.get('[data-testid="neste"').click();
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]').click();
        cy.get('[data-testid=alertstripe]')
            .should('contain', 'Henvendelse mottatt / Request received');
        cy.get('[data-testid=kontaktinformasjonskort-nav]')
            .should('contain', '+47 22222223');
        cy.get('[data-testid=ekstern-lenke-endre-opplysninger]')
            .should('have.attr', 'href', 'https://www.nav.no/person/personopplysninger/#kontaktinformasjon');
    });
    it("TA KONTAKT - Oppretter sak - Henvendelse mottatt - Telefonnummer hos både KRR og NAV", () => {
        cy.route("POST", "/veilarbregistrering/api/oppgave", {});
        cy.route("GET", "/veilarbregistrering/api/person/kontaktinfo", { telefonnummerHosKrr: "+47 22222222", telefonnummerHosNav: "+47 22222223" });
        cy.visit("/");
        cy.get('[data-testid="start-registrering"]').click();
        cy.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        // Legger inn annen stilling enn allere lagret informasjon
        cy.get(
            '[class="inaktiv-soke-input__input-felt--endre typo-normal"]'
        ).click();
        cy.get('[id="stilling"]').type("Klovn");
        cy.get('[id="resultat"]>li').eq(1).click();
        cy.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        cy.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
        cy.get('[data-testid="neste"').click();
        cy.get('[class="skjemaelement__label"]').click();
        cy.get('[data-testid="neste"').click();
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]').click();
        cy.get('[data-testid=alertstripe]')
            .should('contain', 'Henvendelse mottatt / Request received');
        cy.get('[data-testid=kontaktinformasjonskort-nav]')
            .should('contain', '+47 22222223');
        cy.get('[data-testid=kontaktinformasjonskort-krr]')
            .should('contain', '+47 22222222');
        cy.get('[data-testid=ekstern-lenke-endre-opplysninger]')
            .should('have.attr', 'href', 'https://www.nav.no/person/personopplysninger/#kontaktinformasjon');
    });
    it
    it("TA KONTAKT - Oppretter sak - Feilmelding", () => {
        cy.route({
            method: "POST",
            url: "/veilarbregistrering/api/oppgave",
            status: 500,
            response: {},
        });
        cy.visit("/");
        cy.get('[data-testid="start-registrering"]').click();
        cy.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        // Legger inn annen stilling enn allere lagret informasjon
        cy.get(
            '[class="inaktiv-soke-input__input-felt--endre typo-normal"]'
        ).click();
        cy.get('[id="stilling"]').type("Klovn");
        cy.get('[id="resultat"]>li').eq(1).click();
        cy.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        cy.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
        cy.get('[data-testid="neste"').click();
        cy.get('[class="skjemaelement__label"]').click();
        cy.get('[data-testid="neste"').click();
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]').click();
        cy.get('[data-testid=alertstripe]')
            .should('contain', "Noe gikk galt / We're having trouble");
    });
    it("TA KONTAKT - Oppretter sak - Vennligst vent", () => {
        cy.route({
            method: "POST",
            url: "/veilarbregistrering/api/oppgave",
            status: 403,
            response: {},
        });
        cy.route("GET", "/veilarbregistrering/api/person/kontaktinfo", { telefonnummerHosKrr: "+47 22222222", telefonnummerHosNav: "+47 22222223" });
        cy.visit("/");
        cy.get('[data-testid="start-registrering"]').click();
        cy.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        // Legger inn annen stilling enn allere lagret informasjon
        cy.get(
            '[class="inaktiv-soke-input__input-felt--endre typo-normal"]'
        ).click();
        cy.get('[id="stilling"]').type("Klovn");
        cy.get('[id="resultat"]>li').eq(1).click();
        cy.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        cy.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
        cy.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
        cy.get('[data-testid="neste"').click();
        cy.get('[class="skjemaelement__label"]').click();
        cy.get('[data-testid="neste"').click();
        cy.get('[class="knapp avbryt-modal__knapp blokk-s knapp--hoved"]').click();
        cy.get('[data-testid=alertstripe]')
            .should('contain', 'Vennligst vent / Please wait');
        cy.get('[data-testid=kontaktinformasjonskort-nav]')
            .should('contain', '+47 22222223');
        cy.get('[data-testid=kontaktinformasjonskort-krr]')
            .should('contain', '+47 22222222');
        cy.get('[data-testid=ekstern-lenke-endre-opplysninger]')
            .should('have.attr', 'href', 'https://www.nav.no/person/personopplysninger/#kontaktinformasjon');
    });
});
