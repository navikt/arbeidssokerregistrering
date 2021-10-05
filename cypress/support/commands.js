import {alleFeatureToggles} from "../../src/ducks/feature-toggles";
import {
    FEATURE_URL,
    AUTENTISERINGSINFO_URL,
    VEILARBREGISTRERING_URL,
    VEILARBPERSON_NAVN_URL,
    STYRK_URL, PAM_JANZZ_URL
} from "../../src/ducks/api";


Cypress.Commands.add('configure', option => {
    const parameters = alleFeatureToggles.map((element) => "feature=" + element).join("&");
    const baseUrl = Cypress.config().baseUrl;
    const featureToggles = `${FEATURE_URL}/?${parameters}`

    switch (option) {
        case 'registrering':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/ordinaerregistrering');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, {})
                .as('startRegistrering');
            break;
        case 'registrering-seksavtolv':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/ordinaerregistrering-seksavtolv');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, {});
            break;
        case 'registrering-sykefravaer':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrersykmeldt`, {})
                .as('startregistrersykemeldt');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`,  'fixture:/startregistrering/registrering-sykefravaer')
            break;
        case 'reaktivering':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/reaktivering');
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startreaktivering`, {});
            break;
        case 'sperret':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/sperret');
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startreaktivering`, {});
            break;
        case 'allerederegistrert':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/allerederegistrert');
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startreaktivering`, {});
            break;
        case 'arbeidstillatelse-opprett-sak':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/ordinaerregistrering');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startreaktivering`, {});
            cy.route({
                method: 'POST',
                url: `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`,
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
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-true');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/ordinaerregistrering');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, {})
            break;
        case 'feilmelding':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/ordinaerregistrering');
            // cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, {})
            break;
        case 'sesjon-utgaatt':
            cy.on('window:before:load', win => {
                // eslint-disable-next-line no-param-reassign
                win.fetch = null;
            });
            cy.server();
            cy.route('GET', `${baseUrl}${featureToggles}`, 'fixture:/feature-toggle/nedetid-false');
            cy.route('GET', `${baseUrl}${AUTENTISERINGSINFO_URL}`, 'fixture:status-sesjon-utgaatt');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, 'fixture:startregistrering/ordinaerregistrering');
            cy.route('GET', `${baseUrl}${VEILARBPERSON_NAVN_URL}`, 'fixture:navn');
            cy.route('GET', `${baseUrl}${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, 'fixture:sistearbeidsforhold');
            cy.route('GET', `${baseUrl}${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=2419114`, 'fixture:kryssklassifiserMedKonsept');
            cy.route('GET', `${baseUrl}${STYRK_URL}?q=Klovn`, 'fixture:tidligere-yrke');
            cy.route('POST', `${baseUrl}${VEILARBREGISTRERING_URL}/startregistrering`, {})
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
