const stdStegTest = steg => {
    it('Steg har korrekt overskrift', () => {
        cy.get('[class="typo-innholdstittel spm-tittel"]')
            .should('contain', steg.overskrift);
    });
    it('Alle valg har korrekt tekst', () => {
        steg.valg.forEach((tekst, i) => {
            cy.get('[class="alternativ-wrapper"]')
                .eq(i)
                .should('contain.any', tekst);
        });
    });
    it('Viser feilmelding ved klikk på NESTE hvis ingenting er valgt', () => {
        cy.get('[data-testid="neste"')
            .click()
        cy.get('[class="alertstripe spm-advarsel alertstripe--advarsel"]')
            .should('exist');
    });
    it('Alle valg kan velges', () => {
        steg.valg.forEach((_, i) => {
            cy.get('[class="alternativ-wrapper"]')
                .eq(i)
                .click();
            cy.get('[class="alternativ-wrapper"]>label>input')
                .eq(i)
                .should('have.attr', 'aria-checked', 'true')
        });
    });
};

const clickOptionThenNext = n => {
    cy.get('[class="alternativ-wrapper"]')
        .eq(n)
        .click();
    cy.get('[data-testid="neste"]')
        .click();
};

const configureCypress = option => {
    const featureToggles = '/api/feature/?' +
        'feature=arbeidssokerregistrering.nedetid' +
        '?' +
        'feature=arbeidssokerregistrering.oppholdstillatelse.kontakt-bruker'
    switch (option) {
        case 'registrering':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:ordinaerregistrering');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', 'fixture:startregistreringPost');
            break;
        case 'registrering-seksavtolv':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:ordinaerregistrering-seksavtolv');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', 'fixture:startregistreringPost');
            break;
        case 'nedetid':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-true');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:ordinaerregistrering');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', 'fixture:startregistreringPost')
            break;
        case 'feilmelding':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:ordinaerregistrering');
            // cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', 'fixture:startregistreringPost');
            break;
        default:
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
    }
};

export default { stdStegTest, clickOptionThenNext, configureCypress };