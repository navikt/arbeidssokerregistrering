/*tslint:disable*/
import { mock, respondWith, delayed, randomFailure } from './utils';
import startRegistreringStatus from './start-registrering-status';
import innloggingsInfo from './innloggings-info';

const MOCK_START_REGISRERING_STATUS = true;
const MOCK_INNLOGGINGS_INFO = true;


if(MOCK_START_REGISRERING_STATUS) {
    (mock as any).get('/veilarboppfolgingproxy/api/startregistrering', respondWith(delayed(1000, randomFailure(startRegistreringStatus))));
}

if(MOCK_INNLOGGINGS_INFO) {
    (mock as any).get('/innloggingslinje/auth', respondWith(delayed(1000, randomFailure(innloggingsInfo))));
}

(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));
