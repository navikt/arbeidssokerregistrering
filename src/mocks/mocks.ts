/* tslint:disable */
import {
    BRUKER_KONTEKST_URL, FEATURE_URL,
    OPPDATER_KONTEKST_URL, VEILARBPERSON_NAVN_URL, VEILARBREGISTRERING_URL,
} from '../ducks/api';
import { getStore } from '../store';
import {ActionTypes as SvarActionTypes, SporsmalId} from '../ducks/svar';
import svarMock from './svar-mock';
import {ActionTypes as SisteStillingActionTypes} from '../ducks/siste-stilling';
import {sisteStillingMock} from './siste-stilling-mock';
import {hentSvar} from '../ducks/svar-utils';
import autentisert from './autentiseringsinfo-mock';
import pamJanzzData from './typeahead-mock';
import brukersNavn from './brukers-navn-mock';
import startRegistreringStatus from './registreringstatus-mock';
import sisteStillingFraAAReg from './siste-stilling-fra-aareg-mock';
import brukerKontekst from './fss-bruker-kontekst';
import FetchMock, { Middleware, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';
import {ordinaerRegistreringRespons, sykmeldtRegistreringRespons} from "./registrerbruker-mock";
import {featureTogglesMock} from "./feature-toggles-mock";
import oversettelseAvStillingFraAAReg from "./oversettelse-av-stilling-fra-aareg-mock";
import opprettKontaktmegOppgaveRespons from "./oppgave-mock";

export const MOCK_AUTENTISERINGS_INFO = true;
export const MOCK_START_REGISRERING_STATUS = true;
export const MOCK_BRUKERS_NAVN = true;
export const MOCK_GET_SISTE_ARBIEDSFORHOLD = true;
export const MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ = true;
export const MOCK_STYRK08_PAMJANZZ = true;
export const MOCK_FEATURE_TOGGLES = true;
export const MOCK_REGISTRER_BRUKER = true;
export const MOCK_REAKTIVER_BRUKER = true;
export const MOCK_BRUKER_KONTEKST = true;
export const MOCK_OPPRETT_KONTAKTMEG_OPPGAVE = true;
export const PRINT_FRONTENDLOGGER = true;

export const MOCK_OPPDATER_BRUKER_KONTEKST = true;
export const DISPATCH_BESVARELSE = process.env.REACT_APP_MOCK_BES || false;

function lagPamjanzzRespons({q}: { q: string}) {
    const { typeaheadYrkeList } = pamJanzzData;
    console.log('q', q); // tslint:disable-line
    const filtrertListe = typeaheadYrkeList.filter((data) => data.label.toLowerCase().includes(q.toLowerCase()));
    return {
        typeaheadYrkeList: filtrertListe
    }
}

const loggingMiddleware: Middleware = (request, response) => {
    // tslint:disable
    console.groupCollapsed(request.url);
    console.groupCollapsed('config');
    console.log('url', request.url);
    console.log('queryParams', request.queryParams);
    console.log('pathParams', request.pathParams);
    console.log('body', request.body);
    console.groupEnd();

    try {
        console.log('response', JSON.parse(response.body));
    } catch (e) {
        console.log('response', response);
    }

    console.groupEnd();
    // tslint:enable
    return response;
};

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(0),
        loggingMiddleware
    )
});

// Dette dispatcher svarene _før_ noe annet skjer,
// som kan føre til en sær tilstand. Siste test før merge bør skje uten dette flagget.
const DELAY = 0;

if (PRINT_FRONTENDLOGGER) {
    (window as any).frontendlogger = { // tslint:disable-line
        event: (name: string, fields: any, tags: any) => { // tslint:disable-line
            console.log('frontendlogger', {name, fields, tags}); // tslint:disable-line
        }
    };
}

if (MOCK_START_REGISRERING_STATUS) {
    mock.get(`${VEILARBREGISTRERING_URL}/startregistrering`,
        ResponseUtils.delayed(DELAY, startRegistreringStatus));
}

if (MOCK_FEATURE_TOGGLES) {
    mock.get(`${FEATURE_URL}`, ResponseUtils.delayed(DELAY, featureTogglesMock));
}

if (MOCK_BRUKERS_NAVN) {
    mock.get(`${VEILARBPERSON_NAVN_URL}`, ResponseUtils.delayed(DELAY, brukersNavn));
}

if (MOCK_GET_SISTE_ARBIEDSFORHOLD) {
    mock.get(`${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, ResponseUtils.delayed(DELAY, sisteStillingFraAAReg));
}

if (MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ) {
    mock.get('/pam-janzz/rest/kryssklassifiserMedKonsept', ResponseUtils.delayed(DELAY, oversettelseAvStillingFraAAReg)); // tslint:disable-line
}

if (MOCK_STYRK08_PAMJANZZ) {
    mock.get('/pam-janzz/rest/typeahead/yrke-med-styrk08', ResponseUtils.delayed(DELAY,
        (args) => ResponseUtils.jsonPromise(lagPamjanzzRespons(args.queryParams)))); // tslint:disable-line
}

if (MOCK_REGISTRER_BRUKER) {
    mock.post(`${VEILARBREGISTRERING_URL}/startregistrering`, ResponseUtils.delayed(DELAY, ordinaerRegistreringRespons)); // tslint:disable-line
    mock.post(`${VEILARBREGISTRERING_URL}/startregistrersykmeldt`, ResponseUtils.delayed(DELAY, sykmeldtRegistreringRespons)); // tslint:disable-line
}

if (MOCK_REAKTIVER_BRUKER) {
    mock.post(`${VEILARBREGISTRERING_URL}/startreaktivering`, ResponseUtils.delayed(DELAY, {})); // tslint:disable-line
}

if (MOCK_OPPRETT_KONTAKTMEG_OPPGAVE) {
    mock.post(`${VEILARBREGISTRERING_URL}/oppgave`, ResponseUtils.delayed(2500, opprettKontaktmegOppgaveRespons)); // tslint:disable-line
    // mock.post(`${VEILARBREGISTRERING_URL}/oppgave`, ResponseUtils.statusCode(500)); // tslint:disable-line
    // mock.post(`${VEILARBREGISTRERING_URL}/oppgave`, ResponseUtils.statusCode(429)); // tslint:disable-line
}

if (MOCK_BRUKER_KONTEKST) {
    mock.get(`${BRUKER_KONTEKST_URL}`, ResponseUtils.delayed(DELAY, brukerKontekst)); // tslint:disable-line
}

if (MOCK_AUTENTISERINGS_INFO) {
     mock.get('/veilarbstepup/status', ResponseUtils.delayed(DELAY, autentisert));
}

if (MOCK_OPPDATER_BRUKER_KONTEKST) {
    mock.post(`${OPPDATER_KONTEKST_URL}`, ResponseUtils.delayed(DELAY, {})); // tslint:disable-line
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

export default mock;
