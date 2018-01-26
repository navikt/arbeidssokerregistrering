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
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/startregistrering`,
        config});
}

export function registrerBruker() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/registrerbruker`,
        config});
}

export function hentInnloggingsInfo() {
    return fetchToJson({
        url: INNLOGGINGSINFO_URL,
        config,
        recoverWith: () => ({ name: ''})
    });
}

export function hentKrrStatus() {
    return fetchToJson({url: `${VEILARBOPPFOLGINGPROXY_URL}/krr`, recoverWith: krrRecoverWith, config});
}

function krrRecoverWith(status: number) {
    if (status === 404) {
        return { reservertIKrr: true};
    } else if (status >= 500) {
        return { reservertIKrr: false };
    } else {
        return null;
    }
}