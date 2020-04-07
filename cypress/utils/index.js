import moment from 'moment';

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
        cy.get('[class="typo-normal alertstripe__tekst"]')
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

const clickOption = n => {
    cy.get('[class="alternativ-wrapper"]')
        .eq(n)
        .click();
};

const clickNext = n => {
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
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/ordinaerregistrering');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', {})
                .as('startRegistrering');
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
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/ordinaerregistrering-seksavtolv');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', {});
            break;
        case 'registrering-sykefravaer':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startregistrersykmeldt', {})
                .as('startregistrersykemeldt');
            cy.fixture('startregistrering/registrering-sykefravaer')
                .then(fixture => {
                    // Setter dato tretten uker frem i tid
                    fixture.maksDato = moment(new Date(), 'DD.MM.YYYY').add(13, 'week');
                    cy.route('GET', '/veilarbregistrering/api/startregistrering', fixture);
                });
            break;
        case 'reaktivering':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/reaktivering');
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startreaktivering', {});
            break;
        case 'sperret':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/sperret');
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startreaktivering', {});
            break;
        case 'allerederegistrert':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/allerederegistrert');
            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startreaktivering', {});
            break;
        case 'arbeidstillatelse-opprett-sak':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();

            cy.route('GET', '/api/auth', 'fixture:auth');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/veilarbstepup/status', 'fixture:status');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/ordinaerregistrering');
            cy.route('POST', '/veilarbregistrering/api/startreaktivering', {});
            cy.route({
                method: 'POST',
                url: '/veilarbregistrering/api/startregistrering',
                status: 500,
                response: {
                    'id': 'fa5ec8e51366d8b9722bb564f2534e7e',
                    'type': 'BRUKER_MANGLER_ARBEIDSTILLATELSE'
                }
            });
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
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/ordinaerregistrering');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', {})
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
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/ordinaerregistrering');
            // cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', {})
            break;
        default:
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
    }
};

export default { stdStegTest, clickOptionThenNext, configureCypress, clickOption, clickNext };