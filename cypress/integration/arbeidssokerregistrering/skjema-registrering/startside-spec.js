import * as utils from '../../../utils';
import * as skjemaVerdier from '../../../fixtures/ordinaerregistrering-valg.json';


describe('/start - Sykmeldt med arbeidsgiver 39 uker til 52 uker', () => {
    beforeEach(() => {
        utils.configureCypress('registrering');
    });
    it('Viser riktig side (', () => {
        cy.visit('/');
        cy.get('[class="typo-sidetittel"]')
            .should('contain', 'Registrer deg som arbeidssøker');
    });
    it('Viser knapp for aktivitestsplaninformasjon', () => {
        cy.get('[class="knapp knapp--standard"]')
            .should('contain', 'Se video om aktivitetsplanen')
            .click();
    });
    it('Modal med video vises', () => {
        cy.get('[class="typo-innholdstittel informasjon-modal__innholdstittel"]')
            .should('contain', 'Hva er aktivitetsplanen?');
    });
    it('Modal lukkes ved klikk på knapp', () => {
        cy.get('[class="lukknapp lukknapp--overstHjorne informasjon-modal__lukkknapp--shake"]')
            .click();
        cy.get('[class="typo-innholdstittel informasjon-modal__innholdstittel"]')
            .should('not.exist');
    });
    it('Viser knapp for å starte registrering', () => {
        cy.get('[class="knapp knapp--hoved"]')
            .should('contain', 'Start Registrering');
    });
});