describe("/fullfor - Mangler arbeidstillatelse opprett sak", () => {
    beforeEach(() => {
        cy.configure("kontaktinfo-toggle");
    });

    it("TA KONTAKT - Oppretter sak - Henvendelse mottatt - Feature-toggle av", () => {
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
        cy.get('[data-testid=feilmelding]')
            .should('not.exist');
    });

    it("TA KONTAKT - Oppretter sak - Vennligst vent - Feature-toggle av", () => {
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
        cy.get('[data-testid=feilmelding]')
            .should('not.exist');
    });
});
