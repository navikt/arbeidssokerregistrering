/*tslint:disable*/
import {mock, respondWith, delayed, randomFailure} from './utils';
import startRegistreringStatus from './start-registrering-status';
import innloggingsInfo from './innloggings-info';
import environment from './environment-mock';

const MOCK_START_REGISRERING_STATUS = true;
const MOCK_INNLOGGINGS_INFO = true;
const MOCK_ENVIRONMENT = true;

if (MOCK_START_REGISRERING_STATUS) {
    (mock as any).get('/veilarboppfolgingproxy/api/startregistrering', respondWith(delayed(1000, randomFailure(startRegistreringStatus))));
}

if (MOCK_INNLOGGINGS_INFO) {
    (mock as any).get('/innloggingslinje/auth', respondWith(delayed(1000, randomFailure(innloggingsInfo))));
}

if (MOCK_ENVIRONMENT) {
    (mock as any).get('/arbeidssokerregistrering/environment', respondWith(delayed(1000, randomFailure(environment))));
}


(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

