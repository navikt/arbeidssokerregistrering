import * as utils from '../../utils';


describe('Feilmelding vises ved feil i lasting av data', () => {
    beforeEach(() => {
        utils.configureCypress('reaktivering');
    })
    it('/reaktivering - riktig side vises', () => {
        cy.visit('/');
        cy.get('[class="krever-reaktivering"]')
            .should('contain', 'Du er ikke lenger registrert som arbeidssøker');
    });
    it('Knapper vises riktig', () => {
        cy.get('[class="knapp knapp--hoved"]')
            .should('contain', 'Ja');

        cy.get('[class="lenke lenke-avbryt typo-element"]')
            .should('contain', 'Avbryt')
            .should('have.attr', 'href', '/dittnav');
    });
    describe('/duernaregistrert - Du er nå registert som arbeidssøker', () => {
        it('Viser riktig side', () => {
            cy.get('[class="knapp knapp--hoved"]')
                .click();
            cy.get('[class="typo-systemtittel registrert__tittel"]')
                .should('contain', 'Du er nå registrert som arbeidssøker');
        });
        it('Knapperad finnes og linker til riktig adresser', () => {
            cy.get('[class="registrert__lenke knapp knapp--standard"]')
                .should('have.attr', 'href', 'https://www.nav.no/soknader/en/person/arbeid/dagpenger');
            cy.get('[class="registrert__lenke knapp knapp--hoved blokk-m"]')
                .should('have.attr', 'href', 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger');
            cy.get('[class="lenke typo-element"]')
                .should('have.attr', 'href', '/veientilarbeid/');
        });
    });
});