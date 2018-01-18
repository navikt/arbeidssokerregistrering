import { fetchToJson } from './api-utils';
export const INNLOGGINGSINFO_URL = '/innloggingslinje/auth';
export const SBLARBEID_URL = '/sbl/arbeid/registrering';
export const DITTNAV_URL = '/dittnav';
export const VEIENTILARBEID_URL = '/veientilarbeid';

const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';

const config = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentRegistreringStatus() {
    return fetchToJson(`${VEILARBOPPFOLGINGPROXY_URL}/startregistrering`, config);
}

export function hentInnloggingsInfo() {
    return fetchToJson(INNLOGGINGSINFO_URL, config);
}