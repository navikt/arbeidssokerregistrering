describe("/allerederegistrert", () => {
    beforeEach(() => {
        cy.configure("allerederegistrert");
    });
    it("/allerederegistrert - riktig side vises", () => {
        cy.visit("/");
        cy.wait(2000);
        cy.get('[class="typo-normal alertstripe__tekst"]').should(
            "contain",
            "Vi må hjelpe deg videre i andre kanaler"
        );
    });
    it("Jeg vil søke dagpenger - Viser info", () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(0)
            .should("contain", "Jeg vil søke dagpenger")
            .click();
        cy.get('[id="dagpenger-result"]').should(
            "have.attr",
            "class",
            "show-result-text"
        );
    });
    it("Jeg vil søke arbeidsavklaringspenger (AAP) - Viser info", () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(1)
            .should("contain", "Jeg vil søke arbeidsavklaringspenger (AAP)")
            .click();
        cy.get('[id="aap-result"]').should(
            "have.attr",
            "class",
            "show-result-text"
        );
    });
    it("Jeg finner ikke det jeg leter etter - Viser info", () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(3)
            .should("contain", "Jeg finner ikke det jeg leter etter")
            .click();
        cy.get('[id="finnerikke-result"]').should(
            "have.attr",
            "class",
            "show-result-text"
        );
    });
    it("Andre grunner - Viser info", () => {
        cy.get('[class="skjemaelement__label"]')
            .eq(4)
            .should("contain", "Andre grunner")
            .click();
        cy.get('[id="annet-result"]').should(
            "have.attr",
            "class",
            "show-result-text"
        );
    });
    it("AKTIVITESTSPLAN - knapp har riktig data og link", () => {
        cy.get('[class="allerede-registrert__knapp knapp"]')
            .eq(0)
            .should("have.attr", "data-servicegruppe", "TEST_MEG")
            .should("have.attr", "href", "/aktivitetsplan/");
    });
    it("VEIEN TIL ARBEID - knapp har riktig data og link", () => {
        cy.get('[class="allerede-registrert__knapp knapp"]')
            .eq(1)
            .should("have.attr", "data-servicegruppe", "TEST_MEG")
            .should("have.attr", "href", "/veientilarbeid/");
    });
    it("DIALOG - knapp har riktig data og link", () => {
        cy.get('[class="allerede-registrert__knapp knapp"]')
            .eq(2)
            .should("have.attr", "data-servicegruppe", "TEST_MEG")
            .should("have.attr", "href", "/aktivitetsplan/dialog/ny/");
    });
});
