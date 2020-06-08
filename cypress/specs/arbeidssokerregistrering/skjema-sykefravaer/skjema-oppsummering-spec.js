describe('/oppsummering - Dine opplysninger', () => {
    beforeEach(() => {
        cy.configure('registrering-sykefravaer');
    });
    it('Gir beskjed om bruker har jobbet de siste 12 mnd', () => {
        cy.visit('/');
        cy.wait(2000);
        cy.get('[data-testid="start-registrering"]')
            .click();
        cy.clickOptionThenNext(3); // Velg "Jeg er usikker"
        cy.clickOptionThenNext(1); // Velg "Grunnskole"
        cy.clickOptionThenNext(0); // Velg "Ja"
        cy.clickOptionThenNext(0); // Velg "Ja"
        cy.clickOptionThenNext(0); // Velg "Ja"
    });
    it('"Fremtidig situasjon" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
        cy.get('[class="typo-normal"]')
            .eq(0)
            .should('contain', 'Fremtidig situasjon')
            .should('contain', 'Jeg er usikker');
        cy.get('[class="lenke"]')
            .eq(0)
            .should('have.attr', 'href', '/inngangssporsmal');
    });
    it('"Høyeste fullførte utdanning" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
        cy.get('[class="typo-normal"]')
            .eq(1)
            .should('contain', 'Høyeste fullførte utdanning')
            .should('contain', 'Grunnskole');
        cy.get('[class="lenke"]')
            .eq(1)
            .should('have.attr', 'href', '/skjema-sykefravaer/4/0');
    });
    it('"Utdanning godkjent i Norge" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
        cy.get('[class="typo-normal"]')
            .eq(2)
            .should('contain', 'Utdanning godkjent i Norge')
            .should('contain', 'Ja');
        cy.get('[class="lenke"]')
            .eq(2)
            .should('have.attr', 'href', '/skjema-sykefravaer/4/1');
    });
    it('"Utdanning bestått" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
        cy.get('[class="typo-normal"]')
            .eq(3)
            .should('contain', 'Utdanning bestått')
            .should('contain', 'Ja');
        cy.get('[class="lenke"]')
            .eq(3)
            .should('have.attr', 'href', '/skjema-sykefravaer/4/2');
    });
    it('"Andre hensyn NAV bør ta" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
        cy.get('[class="typo-normal"]')
            .eq(4)
            .should('contain', 'Andre hensyn NAV bør ta')
            .should('contain', 'Ja');
        cy.get('[class="lenke"]')
            .eq(4)
            .should('have.attr', 'href', '/skjema-sykefravaer/4/3');
    });
    it('Innhold i POST matcher skjemaverdier', () => {
        cy.get('[data-testid="neste"')
            .click();
        cy.fixture('startregistrersykemeldtPost')
            .then(body => {
                cy.wait('@startregistrersykemeldt')
                    .its('request.body.besvarelse')
                    .should('deep.equal', body.besvarelse);
            });
        cy.get('[class="typo-systemtittel registrert__tittel"]')
            .should('contain', 'Du kan nå få mer veiledning');
    });
    describe('/duernaregistrert - Du kan nå få mer veiledning', () => {
        it('Viser riktig side', () => {
            cy.get('[class="typo-systemtittel registrert__tittel"]')
                .should('contain', 'Du kan nå få mer veiledning');
        });
        it('Knapperad finnes og linker til riktig adresser', () => {
            cy.get('[class="registrert__lenke knapp knapp--hoved blokk-m"]')
                .should('have.attr', 'href', '/veientilarbeid/?visAap=true');
            cy.get('[class="lenke typo-element"]')
                .should('have.attr', 'href', '/veientilarbeid/');
        });
    });

});

