import * as utils from '../../../utils';
import * as skjemaVerdier from '../../../fixtures/ordinaerregistrering-valg.json';


describe('Er opplysningene riktige?', () => {
    describe('Jobbet seks av tolv siste måneder', () => {
        beforeEach(() => {
            utils.configureCypress('registrering-seksavtolv');
        })
        it('Gir beskjed om bruker har jobbet de siste 12 mnd', () => {
            cy.visit('/');
            cy.get('[data-testid="start-registrering"]')
                .click();
            utils.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
            utils.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
            utils.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
            utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
            utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
            utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
            utils.clickOptionThenNext(0); // Velg "Ja" og gå til oppsummering
            cy.get('[class="typo-normal"]')
                .eq(0)
                .should('contain', 'Ifølge Arbeidsgiver- og arbeidstakerregisteret har du vært i jobb i løpet av det siste året.');
        })
    })
    describe('Normal oppsummeringsside', () => {
        beforeEach(() => {
            utils.configureCypress('registrering');
        })
        it('Navigerer frem til oppsummeringssiden', () => {
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
        });
        it('"Situasjon" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
            cy.get('[class="typo-normal"]')
                .eq(0)
                .should('contain', 'Situasjon')
                .should('contain', 'Har ikke vært i jobb de siste 2 årene');
            cy.get('[class="lenke"]')
                .eq(0)
                .should('have.attr', 'href', '/skjema/0');
        });
        it('"Siste stilling" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
            cy.get('[class="typo-normal"]')
                .eq(1)
                .should('contain', 'Siste stilling')
                .should('contain', 'Klovn kommunal sektor');
            cy.get('[class="lenke"]')
                .eq(1)
                .should('have.attr', 'href', '/skjema/1');
        });
        it('"Høyeste fullførte utdanning" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
            cy.get('[class="typo-normal"]')
                .eq(2)
                .should('contain', 'Høyeste fullførte utdanning')
                .should('contain.any', 'Høyere utdanning (1 til 4 år)');
            cy.get('[class="lenke"]')
                .eq(2)
                .should('have.attr', 'href', '/skjema/2');
        });
        it('"Utdanning godkjent i Norge" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
            cy.get('[class="typo-normal"]')
                .eq(3)
                .should('contain', 'Utdanning godkjent i Norge')
                .should('contain.any', 'Ja');
            cy.get('[class="lenke"]')
                .eq(3)
                .should('have.attr', 'href', '/skjema/3');
        });
        it('"Utdanning bestått" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
            cy.get('[class="typo-normal"]')
                .eq(4)
                .should('contain', 'Utdanning bestått')
                .should('contain.any', 'Ja');
            cy.get('[class="lenke"]')
                .eq(4)
                .should('have.attr', 'href', '/skjema/4');
        });
        it('"Helseproblemer" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
            cy.get('[class="typo-normal"]')
                .eq(5)
                .should('contain', 'Helseproblemer')
                .should('contain.any', 'Ja');
            cy.get('[class="lenke"]')
                .eq(5)
                .should('have.attr', 'href', '/skjema/5');
        });
        it('"Andre problemer" viser korrekt informasjon og "endre" navigerer tilbake til korrekt skjema', () => {
            cy.get('[class="typo-normal"]')
                .eq(6)
                .should('contain', 'Andre problemer')
                .should('contain.any', 'Ja');
            cy.get('[class="lenke"]')
                .eq(6)
                .should('have.attr', 'href', '/skjema/6');
        });
        it('Naviger til fullfør ved klikk på "JA, NESTE', () => {
            cy.get('[data-testid="neste"')
                .click()
            cy.get('[class="typo-innholdstittel fullfor-tittel"')
                .should('contain', 'Fullfør registreringen');
        });
    });
});