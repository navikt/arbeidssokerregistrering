import { fetchToJson } from './utils';
import { AppState } from '../reducer';
import { EnvironmentData } from './environment';
export const INNLOGGINGSINFO_URL = '/innloggingslinje/auth';

export function hentRegistreringStatus(baseUrl: string) {
    return fetchToJson(`${baseUrl}/api/startregistrering`);
}

export function hentInnloggingsInfo() {
    return fetchToJson(INNLOGGINGSINFO_URL);
}

export function hentEnvironment() {
    return fetchToJson('/arbeidssokerregistrering/environment');
}

function getEnvironmentVariable(environment: EnvironmentData, property: string) {
    if (window.name === 'nodejs') {
        return ''; // I test
    }

    const value = environment[property];
    if (!value && value !== '') {
        throw new Error(`Mangler: ${property}`);
    }

    return value;
}

export function veilarboppfolgingproxyUrlSelector(state: AppState) {
    return getEnvironmentVariable(state.environment.data, 'veilarboppfolgingproxy_url');
}