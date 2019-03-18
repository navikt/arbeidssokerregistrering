/*tslint:disable*/
import { delayed, lagPamjanzzRespons, mock, respondWith } from './utils';
import startRegistreringStatus from './registreringstatus-mock';
import brukersNavn from './brukers-navn-mock';
import sisteStillingFraAAReg from './siste-stilling-fra-aareg-mock';
import oversettelseAvStillingFraAAReg from './oversettelse-av-stilling-fra-aareg-mock';
import {featureTogglesMock} from './feature-toggles-mock';
import {
    BRUKER_KONTEKST_URL,
    ENHET_KONTEKST_URL,
    FEATURE_URL, OPPDATER_KONTEKST_URL,
    VEILARBPERSON_NAVN_URL,
    VEILARBREGISTRERING_URL
} from '../ducks/api';
import autentisert from './autentiseringsinfo-mock';
import {
    ordinaerRegistreringRespons,
    sykmeldtRegistreringRespons
} from './registrerbruker-mock';
import { getStore } from '../store';
import {ActionTypes as SvarActionTypes, SporsmalId} from '../ducks/svar';
import svarMock from './svar-mock';
import {ActionTypes as SisteStillingActionTypes} from '../ducks/siste-stilling';
import {sisteStillingMock} from './siste-stilling-mock';
import {hentSvar} from '../ducks/svar-utils';
import brukerKontekst from './fss-bruker-kontekst';
import enhetKontekst from './fss-enhet-kontekst';

export const MOCK_START_REGISRERING_STATUS = true;
export const MOCK_REGISTRER_BRUKER = true;
export const MOCK_REAKTIVER_BRUKER = true;
export const MOCK_BRUKERS_NAVN = true;
export const MOCK_AUTENTISERINGS_INFO = true;
export const MOCK_GET_SISTE_ARBIEDSFORHOLD = true;
export const MOCK_POST_SISTE_ARBIEDSFORHOLD = true;
export const MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ = true;
export const MOCK_STYRK08_PAMJANZZ = true;
export const MOCK_FEATURE_TOGGLES = true;
export const MOCK_BRUKER_KONTEKST = true;
export const MOCK_ENHET_KONTEKST = true;
export const MOCK_OPPDATER_BRUKER_KONTEKST = true;
export const PRINT_FRONTENDLOGGER = true;
export const DISPATCH_BESVARELSE = process.env.REACT_APP_MOCK_BES || false;
// Dette dispatcher svarene _før_ noe annet skjer,
// som kan føre til en sær tilstand. Siste test før merge bør skje uten dette flagget.
const DELAY = 0;

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
    (mock as any).get(`glob:${VEILARBREGISTRERING_URL}/startregistrering*`, response);
}

if (MOCK_FEATURE_TOGGLES) {
    (mock as any).get(`express:${FEATURE_URL}/?feature(.*)`, respondWith(delayed(DELAY, featureTogglesMock)));
}

if (MOCK_BRUKERS_NAVN) {
    (mock as any).get(`glob:${VEILARBPERSON_NAVN_URL}*`, respondWith(delayed(DELAY, brukersNavn)));
}

if(MOCK_GET_SISTE_ARBIEDSFORHOLD) {
    const response = respondWith(delayed(DELAY, sisteStillingFraAAReg));
    (mock as any).get(`glob:${VEILARBREGISTRERING_URL}/sistearbeidsforhold*`, response);
}

if(MOCK_POST_SISTE_ARBIEDSFORHOLD) {
    (mock as any).post(`glob:${VEILARBREGISTRERING_URL}/sistearbeidsforhold*`, respondWith(delayed(DELAY, (url, config, params) => {
        return params.bodyParams;
    })));
}

if(MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ) {
    (mock as any).get('express:/pam-janzz/rest/kryssklassifiserMedKonsept(.*)', respondWith(delayed(DELAY / 2, oversettelseAvStillingFraAAReg)));
}

if(MOCK_STYRK08_PAMJANZZ) {
    (mock as any).get('express:/pam-janzz/rest/typeahead/yrke-med-styrk08(.*)',
        respondWith(delayed(DELAY / 10, (url, config, {queryParams}) => lagPamjanzzRespons(queryParams))));
}

if (MOCK_REGISTRER_BRUKER) {
    const ordinaerRespons = respondWith(delayed(DELAY, ordinaerRegistreringRespons, 200));
    const sykmeldtRespons = respondWith(delayed(DELAY, sykmeldtRegistreringRespons, 200));

    (mock as any).post(`glob:${VEILARBREGISTRERING_URL}/startregistrering*`, ordinaerRespons);
    (mock as any).post(`glob:${VEILARBREGISTRERING_URL}/startregistrersykmeldt*`, sykmeldtRespons);
}

if (MOCK_REAKTIVER_BRUKER) {
    const response = respondWith(delayed(DELAY, {}, 200));
    (mock as any).post(`glob:${VEILARBREGISTRERING_URL}/startreaktivering*`, response);
}


if (MOCK_BRUKER_KONTEKST) {
    const response = respondWith(delayed(DELAY, brukerKontekst, 200));
    (mock as any).get(`glob:${BRUKER_KONTEKST_URL}`, response);
}

if (MOCK_ENHET_KONTEKST) {
    const response = respondWith(delayed(DELAY, enhetKontekst, 200));
    (mock as any).get(`glob:${ENHET_KONTEKST_URL}`, response);
}

if (MOCK_OPPDATER_BRUKER_KONTEKST) {
    const response = respondWith(delayed(DELAY, {}, 200));
    (mock as any).post(`glob:${OPPDATER_KONTEKST_URL}`, response);
}

if (DISPATCH_BESVARELSE) {
    const store = getStore();
    [
        SporsmalId.dinSituasjon,
        SporsmalId.sisteStilling,
        SporsmalId.utdanning,
        SporsmalId.utdanningGodkjent,
        SporsmalId.utdanningBestatt,
        SporsmalId.helseHinder,
        SporsmalId.andreForhold,
    ].forEach(sporsmalId => store.dispatch({
        type: SvarActionTypes.AVGI_SVAR,
        data: {
            sporsmalId,
            svar: hentSvar(svarMock, sporsmalId),
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
