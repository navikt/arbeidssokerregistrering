import { fetchToJson } from './api-utils';
import { Data as SisteArbeidsforholdData } from '../ducks/siste-arbeidsforhold';

export const INNLOGGINGSINFO_URL = '/innloggingslinje/auth';
export const SBLARBEID_URL = '/sbl/arbeid/registrering';
export const DITTNAV_URL = '/dittnav';
export const VEIENTILARBEID_URL = '/veientilarbeid';
export const ARBEIDSSOKERREGISTRERING_START = '/arbeidssokerregistrering/start';
export const VEILARBSTEPUP = `/veilarbstepup/niva/4?url=${ARBEIDSSOKERREGISTRERING_START}`;

const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';

const MED_CREDENTIALS = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentRegistreringStatus() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/startregistrering`,
        config: MED_CREDENTIALS});
}

export function hentInnloggingsInfo() {
    return fetchToJson({
        url: INNLOGGINGSINFO_URL,
        config: MED_CREDENTIALS
    });
}

export function hentSisteArbeidsforhold() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/sistearbeidsforhold`,
        config: MED_CREDENTIALS,
        recoverWith: () => ({arbeidsgiver: null, stilling: null, fra: null, til: null})
    });
}

export function registrerSisteArbeidsforhold(data: SisteArbeidsforholdData) {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/sistearbeidsforhold`,
        config: { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(data)}
    });
}

export function hentKrrStatus() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/krr`,
        recoverWith: krrRecoverWith,
        config: MED_CREDENTIALS});
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