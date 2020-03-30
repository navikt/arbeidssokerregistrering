import * as utils from '../../../utils';
import * as skjemaVerdier from '../../../fixtures/registrering-sykefravaer-valg.json';


describe('/inngangssporsmal - Hva tenker du om din fremtidige situasjon?', () => {
    beforeEach(() => {
        utils.configureCypress('registrering-sykefravaer');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
    });
    utils.stdStegTest(skjemaVerdier[0]);
    it('Jeg skal tilbake til jobben jeg har - Navigerer til /skjema-sykefravaer/0/1', () => {
        utils.clickOptionThenNext(0); // Velg "Jeg skal tilbake til jobben jeg har"
        cy.get('[class="typo-innholdstittel spm-tittel blokk-xxxl"]')
            .should('contain', 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?');
        cy.go('back');
    });
    it('Jeg skal tilbake til arbeidsgiveren min, men i ny stilling - Navigerer til /skjema-sykefravaer/0/1', () => {
        utils.clickOptionThenNext(1); // Velg "Jeg skal tilbake til arbeidsgiveren min, men i ny stilling"
        cy.get('[class="typo-innholdstittel spm-tittel blokk-xxxl"]')
            .should('contain', 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?');
        cy.go('back');
    });
    it('Jeg trenger ny jobb - Navigerer til /skjema-sykefravaer/3/0', () => {
        utils.clickOptionThenNext(2); // Velg "Jeg trenger ny jobb" 
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Hva er din høyeste fullførte utdanning?');
        cy.go('back');
    });
    it('Jeg er usikker - Navigerer til /skjema-sykefravaer/3/0', () => {
        utils.clickOptionThenNext(3); // Velg "Jeg er usikker" 
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', 'Hva er din høyeste fullførte utdanning?');
        cy.go('back');
    });
    it('Ingen av disse alternativene passer - Navigerer til /oppsummering', () => {
        utils.clickOptionThenNext(4); // Velg "Ingen av disse alternativene passer" 
        cy.get('[class="typo-innholdstittel oppsummering-tittel"]')
            .should('contain', 'Dine opplysninger');
        cy.go('back');
    });
});