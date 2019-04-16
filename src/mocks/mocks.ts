/*tslint:disable*/
import {
    OPPDATER_KONTEKST_URL,
} from '../ducks/api';
import { getStore } from '../store';
import {ActionTypes as SvarActionTypes, SporsmalId} from '../ducks/svar';
import svarMock from './svar-mock';
import {ActionTypes as SisteStillingActionTypes} from '../ducks/siste-stilling';
import {sisteStillingMock} from './siste-stilling-mock';
import {hentSvar} from '../ducks/svar-utils';
import autentisert from './autentiseringsinfo-mock';
export const MOCK_AUTENTISERINGS_INFO = true;

export const MOCK_OPPDATER_BRUKER_KONTEKST = true;
export const DISPATCH_BESVARELSE = process.env.REACT_APP_MOCK_BES || false;

import FetchMock, { Middleware, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';
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
// const DELAY = 0;
//
// if (PRINT_FRONTENDLOGGER) {
//     (window as any).frontendlogger = {
//         event: (name: string, fields: any, tags: any) => {
//             console.log('frontendlogger', {name, fields, tags});
//         }
//     }
// }
//

if (MOCK_AUTENTISERINGS_INFO) {
     mock.get('/veilarbstepup/status', ResponseUtils.delayed(200, autentisert));
}

if (MOCK_OPPDATER_BRUKER_KONTEKST) {
    // const response = respondWith(delayed(DELAY, {}, 200));
    // (mock as any).post(`glob:${OPPDATER_KONTEKST_URL}`, response);
    mock.post(`glob:${OPPDATER_KONTEKST_URL}`, ResponseUtils.delayed(200, {})); // tslint:disable-line
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
// (mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));
