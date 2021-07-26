import {alleFeatureToggles} from "../../src/ducks/feature-toggles";
import {FEATURE_URL} from "../../src/ducks/api";


Cypress.Commands.add('configure', option => {
    const parameters = alleFeatureToggles.map((element) => "feature=" + element).join("&");
    const featureToggles = `${FEATURE_URL}/?${parameters}`
    switch (option) {
        case 'registrering':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
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
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
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
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startregistrersykmeldt', {})
                .as('startregistrersykemeldt');
            cy.route('GET', '/veilarbregistrering/api/startregistrering',  'fixture:/startregistrering/registrering-sykefravaer')
            break;
        case 'reaktivering':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/reaktivering');
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
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
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
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
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
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
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
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
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-true');
            cy.route('GET', '/api/auth', 'fixture:status');
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
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status');
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/ordinaerregistrering');
            // cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', {})
            break;
        case 'sesjon-utgaatt':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', featureToggles, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', '/api/auth', 'fixture:status-sesjon-utgaatt');
            cy.route('GET', '/veilarbregistrering/api/startregistrering', 'fixture:startregistrering/ordinaerregistrering');
            cy.route('GET', '/veilarbperson/api/person/navn', 'fixture:navn');
            cy.route('GET', '/veilarbregistrering/api/sistearbeidsforhold', 'fixture:sistearbeidsforhold');
            cy.route('GET', '/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=2419114', 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', '/pam-janzz/rest/typeahead/yrke-med-styrk08?q=Klovn', 'fixture:tidligere-yrke');
            cy.route('POST', '/veilarbregistrering/api/startregistrering', {})
                .as('startRegistrering');
            break;
        default:
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
    }
});
Cypress.Commands.add("stegTest", steg => {
    cy.get('[class="typo-innholdstittel spm-tittel"]').should(
        "contain",
        steg.overskrift
    );
    steg.valg.forEach((tekst, i) => {
        cy.get('[class="alternativ-wrapper"]').eq(i).should("contain.any", tekst);
    });
    cy.get('[data-testid="neste"').click();
    cy.get('[class="typo-normal alertstripe__tekst"]').should("exist");
    steg.valg.forEach((_, i) => {
        cy.get('[class="alternativ-wrapper"]').eq(i).click();
        cy.get('[class="alternativ-wrapper"]>label>input')
            .eq(i)
            .should("have.attr", "aria-checked", "true");
    });
});
Cypress.Commands.add("clickOptionThenNext", n => {
    cy.get('[class="alternativ-wrapper"]').eq(n).click();
    cy.get('[data-testid="neste"]').click();
});
