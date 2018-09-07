/*tslint:disable*/
import {delayed, lagPamjanzzRespons, mock, respondWith} from './utils';
import startRegistreringStatus from './registreringstatus-mock';
import brukersNavn from './brukers-navn-mock';
import sisteStillingFraAAReg from './siste-stilling-fra-aareg-mock';
import oversettelseAvStillingFraAAReg from './oversettelse-av-stilling-fra-aareg-mock';
import {featureTogglesMock} from "./feature-toggles-mock";
import {FEATURE_URL, VEILARBREGISTRERING_URL} from '../ducks/api';
import autentisert from './autentiseringsinfo-mock';
import registreringRespons from "./registrerbruker-mock";
import getStore from "../store";
import {ActionTypes as SvarActionTypes} from '../ducks/svar';
import svarMock from "./svar-mock";
import {ActionTypes as SisteStillingActionTypes} from '../ducks/siste-stilling';
import {sisteStillingMock} from "./siste-stilling-mock";

const MOCK_START_REGISRERING_STATUS = true;
const MOCK_REGISTRER_BRUKER = false;
const MOCK_REAKTIVER_BRUKER = true;
const MOCK_BRUKERS_NAVN = true;
const MOCK_AUTENTISERINGS_INFO = true;
const MOCK_GET_SISTE_ARBIEDSFORHOLD = true;
const MOCK_POST_SISTE_ARBIEDSFORHOLD = true;
const MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ = true;
const MOCK_STYRK08_PAMJANZZ = true;
const MOCK_SBL = true;
const MOCK_FEATURE_TOGGLES = true;
const DISPATCH_BESVARELSE = false; // Dette dispatcher svarene _før_ noe annet skjer, som kan føre til en sær tilstand. Siste test før merge bør skje uten dette flagget.
const PRINT_FRONTENDLOGGER = true;
const DELAY = 1000;

if (PRINT_FRONTENDLOGGER) {
    (window as any).frontendlogger = {
        event: (name: string, fields: any, tags: any) => {
            console.log('frontendlogger', {name, fields, tags});
        }
    }
}

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

if (MOCK_BRUKERS_NAVN) {
    (mock as any).get('glob:/innloggingslinje/auth*', respondWith(delayed(DELAY, brukersNavn)));
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
        respondWith(delayed(1000, (url, config, {queryParams}) => lagPamjanzzRespons(queryParams))));
}

if (MOCK_REGISTRER_BRUKER) {
    const response = respondWith(delayed(DELAY, registreringRespons, 200));
    (mock as any).post(`${VEILARBREGISTRERING_URL}/startregistrering`, response);
}

if (MOCK_REAKTIVER_BRUKER) {
    const response = respondWith(delayed(500, {}, 200));
    (mock as any).post(`${VEILARBREGISTRERING_URL}/startreaktivering`, response);
}

if (DISPATCH_BESVARELSE) {
    const store = getStore();
    [
        'utdanning',
        'utdanningBestatt',
        'utdanningGodkjent',
        'helseHinder',
        'andreForhold',
        'sisteStilling',
        'dinSituasjon',
    ].forEach(sporsmalId => store.dispatch({
        type: SvarActionTypes.AVGI_SVAR,
        data: {
            sporsmalId,
            svar: svarMock[sporsmalId],
        }
    }));
    store.dispatch({
        type: SisteStillingActionTypes.ENDRE_SISTE_STILLING,
        data: {
            stilling: sisteStillingMock,
        }
    });
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

