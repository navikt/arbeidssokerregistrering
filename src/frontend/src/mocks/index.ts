/*tslint:disable*/
import {mock, respondWith, delayed } from './utils';
import startRegistreringStatus from './start-registrering-status';
import innloggingsInfo from './innloggings-info';

const MOCK_START_REGISRERING_STATUS = true;
const MOCK_INNLOGGINGS_INFO = true;
const MOCK_HENT_KRR_STATUS = true;


if (MOCK_START_REGISRERING_STATUS) {
    (mock as any).get('/veilarboppfolgingproxy/api/startregistrering', respondWith(delayed(1000, startRegistreringStatus)));
}

if (MOCK_INNLOGGINGS_INFO) {
    (mock as any).get('/innloggingslinje/auth', respondWith(delayed(1000, innloggingsInfo)));
}

if(MOCK_HENT_KRR_STATUS) {
    (mock as any).get('/veilarboppfolgingproxy/api/krr', respondWith(delayed(1000, { reservertIKrr: false})));
}


(mock as any).mock('*', respondWith((url: string, config: {}) => mock.realFetch.call(window, url, config)));

