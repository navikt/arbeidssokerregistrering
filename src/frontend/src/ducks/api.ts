import { fetchToJson } from './api-utils';
import { Data as SisteArbeidsforholdData } from './siste-arbeidsforhold';
import { Data as RegistrerBrukerData } from './registrerbruker';

export const INNLOGGINGSINFO_URL = '/innloggingslinje/auth';
export const SBLARBEID_URL = '/sbl/nav_security_check';
export const DITTNAV_URL = '/dittnav';
export const MELDEKORT_URL = '/meldekort/genereltommeldekort';
export const VEIENTILARBEID_URL = '/veientilarbeid';
export const VEIENTILARBEID_MED_OVERLAY_URL = '/veientilarbeid/?visOverlay=true';
export const ARBEIDSSOKERREGISTRERING_START = '/arbeidssokerregistrering/start';
export const VEILARBSTEPUP = `/veilarbstepup/niva/4?url=${ARBEIDSSOKERREGISTRERING_START}`;

const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';
const PAM_JANZZ_URL = '/pam-janzz/rest';

export const getCookie = name => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};
function getHeaders() {
    return new Headers({
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'), // eslint-disable-line quote-props
    });
}

const MED_CREDENTIALS = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentRegistreringStatus() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/startregistrering`,
        config: MED_CREDENTIALS});
}

export function registrerBruker(data: RegistrerBrukerData) {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/startregistrering`,
        config: { ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify(data)}
    });
}

export function hentInnloggingsInfo() {
    return fetchToJson({
        url: `${INNLOGGINGSINFO_URL}?randomness=${Math.random()}`,
        config: MED_CREDENTIALS
    });
}

export function hentSisteArbeidsforhold() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/sistearbeidsforhold`,
        config: MED_CREDENTIALS,
        recoverWith: () => ({arbeidsgiver: null, stilling: null, styrk: null, fra: null, til: null})
    });
}

export function hentStillingFraPAM(styrk: string) {
    return fetchToJson({
        url: `${PAM_JANZZ_URL}/kryssklassifiser?kodeForOversetting=${styrk}`,
        config: MED_CREDENTIALS,
        recoverWith: () => ({koder: []})
    });
}

export function registrerSisteArbeidsforhold(data: SisteArbeidsforholdData) {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/sistearbeidsforhold`,
        config: { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(data)}
    });
}