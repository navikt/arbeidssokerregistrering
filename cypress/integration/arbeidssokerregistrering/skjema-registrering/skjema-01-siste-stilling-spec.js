import * as utils from '../../../utils';


describe('skjema/1 - Hva er din siste jobb?', () => {
    beforeEach(() => {
        utils.configureCypress('registering');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        utils.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
    });
    it('Steg har korrekt overskrift', () => {
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Hva er din siste jobb?');
    });
    it('Siste arbeidsforhold skules hvis man velger "Har ikke vært i jobb"', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(1)
            .click();
        cy.get('[class="typo-normal inaktiv-soke-input__input-felt--stilling-tekst"]')
            .should('not.exist');
    });
    it('Siste arbeidsforhold er "Tester"', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(0)
            .click();
        cy.get('[class="typo-normal inaktiv-soke-input__input-felt--stilling-tekst"]')
            .should('contain', 'Tester');
    });
    it('Man kan endre siste stilling', () => {
        cy.get('[class="inaktiv-soke-input__input-felt--endre typo-normal"]')
            .click();
        cy.get('[id="stilling"]')
            .type('Klovn');
        cy.get('[id="resultat"]')
            .should('have.attr', 'aria-expanded', 'true');
        cy.get('[id="resultat"]>li')
            .eq(1)
            .click();
        cy.get('[class="typo-normal inaktiv-soke-input__input-felt--stilling-tekst"]')
            .should('contain', 'Klovn kommunal sektor');
    });
    it('Viser informasjon om bruk av informasjon', () => {
        cy.get('[class="typo-normal ekspanderbartinfo__label"]')
            .should('contain', 'Hva bruker vi informasjonen om din siste stilling til?')
            .click();
        cy.get('[class="ekspanderbartinfo__innhold"]>p>span')
            .should('contain', 'Vi bruker opplysningene ');
    });
    it('Går videre til neste /skjema/2 ved klikk på NESTE', () => {
        cy.get('[data-testid="neste"]')
            .should('have.attr', 'href', '/skjema/2')
            .click()
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Hva er din høyeste fullførte utdanning?');
    });
});