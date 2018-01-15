import { fetchToJson } from './utils';
import { VEILARBOPPFOLGINGPROXY_BASE_URL } from '../utils/environment';
export const INNLOGGINGSINFO_URL = '/innloggingslinje/auth';

export function hentRegistreringStatus() {
    return fetchToJson(`${VEILARBOPPFOLGINGPROXY_BASE_URL}/startregistrering`);
}

export function hentInnloggingsInfo() {
    return fetchToJson(INNLOGGINGSINFO_URL);
}