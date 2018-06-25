/*tslint:disable*/
import { mock, respondWith, delayed, lagPamjanzzRespons } from './utils';
import startRegistreringStatus from './start-registrering-status';
import brukersNavn from './brukers-navn';
import brukersFnr from './brukers-fnr';
import sisteStillingFraAAReg from './siste-stilling-fra-aareg';
import oversettelseAvStillingFraAAReg from './oversettelse-av-stilling-fra-aareg';
import {featureTogglesMock} from "./feature-toggles";
import {
    FEATURE_URL, VEILARBOPPFOLGINGPROXY_ME_URL, VEILARBREGISTRERING_URL
} from '../ducks/api';
import autentisert from './autentisert';
import registreringRespons from "./registrer-bruker";

const MOCK_START_REGISRERING_STATUS = true;
const MOCK_REGISTRER_BRUKER = true;
const MOCK_BRUKERS_FNR = true;
const MOCK_BRUKERS_NAVN = true;
const MOCK_AUTENTISERINGS_INFO = true;
const MOCK_GET_SISTE_ARBIEDSFORHOLD = true;
const MOCK_POST_SISTE_ARBIEDSFORHOLD = true;
const MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ = true;
const MOCK_STYRK08_PAMJANZZ = true;
const MOCK_SBL = true;
const MOCK_FEATURE_TOGGLES = true;
const DELAY = 0;

if (MOCK_AUTENTISERINGS_INFO) {
    (mock as any).get('glob:/veilarbstepup/status*', respondWith(delayed(DELAY, autentisert)));
}

if (MOCK_START_REGISRERING_STATUS) {
    const response = respondWith(delayed(DELAY, startRegistreringStatus));
    (mock as any).get(`${VEILARBREGISTRERING_URL}/startregistrering`, response);
}

if (MOCK_FEATURE_TOGGLES) {
    (mock as any).get(`express:${FEATURE_URL}/?feature(.*)`, respondWith(delayed(DELAY, featureTogglesMock)));
}

if (MOCK_REGISTRER_BRUKER) {
    const response = respondWith(delayed(DELAY, registreringRespons));
    (mock as any).post(`${VEILARBREGISTRERING_URL}/startregistrering`, response);
}

if (MOCK_BRUKERS_NAVN) {
    (mock as any).get('glob:/innloggingslinje/auth*', respondWith(delayed(DELAY, brukersNavn)));
}

if (MOCK_BRUKERS_FNR) {
    (mock as any).get(`${VEILARBOPPFOLGINGPROXY_ME_URL}`, respondWith(delayed(DELAY, brukersFnr)));
}

if(MOCK_GET_SISTE_ARBIEDSFORHOLD) {
    const response = respondWith(delayed(DELAY, sisteStillingFraAAReg));
    (mock as any).get(`${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, response);
}

if(MOCK_POST_SISTE_ARBIEDSFORHOLD) {
    (mock as any).post(`${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, respondWith(delayed(DELAY, (url, config, params) => {
        return params.bodyParams;
    })));
}

if(MOCK_SBL) {
    (mock as any).post('/sbl/arbeid/opprettMinIdBruker', respondWith(delayed(DELAY * 2, {}, 404)));
}

if(MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ) {
    (mock as any).get('express:/pam-janzz/rest/kryssklassifiserMedKonsept(.*)', respondWith(delayed(DELAY / 2, oversettelseAvStillingFraAAReg)));
}

if(MOCK_STYRK08_PAMJANZZ) {
    (mock as any).get('express:/pam-janzz/rest/typeahead/yrke-med-styrk08(.*)',
        respondWith(delayed(DELAY / 10, (url, config, {queryParams}) => lagPamjanzzRespons(queryParams))));
}


(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

