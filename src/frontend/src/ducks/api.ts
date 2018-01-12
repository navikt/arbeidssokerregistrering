import { fetchToJson } from './utils';
export const VEILARBOPPFOLGING_URL = '/veilarboppfolgingproxy/api/startregistrering';
export const INNLOGGINGSINFO_URL = '/innloggingslinje/auth';

export function hentRegistreringStatus() {
    return fetchToJson(VEILARBOPPFOLGING_URL);
}

export function hentInnloggingsInfo() {
    return fetchToJson(INNLOGGINGSINFO_URL);
}