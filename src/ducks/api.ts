import { fetchToJson, fetchWithTimeout } from './api-utils';
import { Data as RegistrerBrukerData } from './registrerbruker';
import { alleFeatureToggles } from './feature-toggles';
import { RegistreringType } from './registreringstatus';

export const INNLOGGINGSLINJE_URL = '/innloggingslinje/auth';
export const AUTENTISERINGSINFO_URL = '/veilarbstepup/status';
export const VEIENTILARBEID_URL = '/veientilarbeid/';
export const VEIENTILARBEID_MED_DAGPENGER_URL = '/veientilarbeid/?visInformasjonsmodul=true&visdagpenger=true';
export const VEIENTILARBEID_MED_AAP_URL = '/veientilarbeid/?visAap=true';
export const ARBEIDSSOKERREGISTRERING_START = '/arbeidssokerregistrering/start';
export const VEILARBSTEPUP = `/veilarbstepup/oidc?url=${ARBEIDSSOKERREGISTRERING_START}`;
export const SBLARBEID_OPPRETT_MIN_ID_URL = '/sbl/nav_security_check?goto=/sbl/arbeid/opprettMinIdBruker';
export const VEILARBREGISTRERING_URL = '/veilarbregistrering/api';
export const FEATURE_URL = '/arbeidssokerregistrering/api/feature';
export const DITT_NAV_URL = '/dittnav';
export const DITT_SYKEFRAVAER_URL = '/sykefravaer';

const PAM_JANZZ_URL = '/pam-janzz/rest';
const STYRK_URL = `${PAM_JANZZ_URL}/typeahead/yrke-med-styrk08`;

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
        url: `${VEILARBREGISTRERING_URL}/startregistrering`,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        }
    });
}

export function registrerBruker(data: RegistrerBrukerData, registreringType: RegistreringType) {

    const endepunkt = registreringType === RegistreringType.SYKMELDT_REGISTRERING ?
        'startregistrersykmeldt' : 'startregistrering';

    return fetchToJson({
        url: `${VEILARBREGISTRERING_URL}/${endepunkt}`,
        config: { ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify(data)
        }
    });

}

export function startReaktivering() {
    return fetchToJson({
        url: `${VEILARBREGISTRERING_URL}/startreaktivering`,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify({})
        }
    });
}

const sblOpprettMinIdConfig = {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: {'pragma': 'no-cache', 'cache-control': 'no-cache'}
};

export function registrerBrukerSBLArbeid(timeoutMillis?: number) {
    return timeoutMillis ?
        fetchWithTimeout(SBLARBEID_OPPRETT_MIN_ID_URL, timeoutMillis, (sblOpprettMinIdConfig as RequestInit)) :
        fetch(SBLARBEID_OPPRETT_MIN_ID_URL, (sblOpprettMinIdConfig as RequestInit));
}

export function hentBrukersNavn() {
    return fetchToJson({
        url: `${INNLOGGINGSLINJE_URL}?randomness=${Math.random()}`,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        }
    });
}

export function hentAutentiseringsInfo() {
    return fetchToJson({
        url: `${AUTENTISERINGSINFO_URL}`,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        }
    });
}

export function hentStyrkkodeForSisteStillingFraAAReg() {
    return fetchToJson({
        url: `${VEILARBREGISTRERING_URL}/sistearbeidsforhold`,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        },
        recoverWith: () => ({arbeidsgiver: null, stilling: null, styrk: null, fra: null, til: null})
    });
}

export function hentStillingFraPamGittStyrkkode(styrk: string) {
    return fetchToJson({
        url: `${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=${styrk}`,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        },
        recoverWith: () => ({konseptMedStyrk08List: []})
    });
}

export function hentStillingMedStyrk08(sokestreng: string) {
    return fetchToJson({
        url: `${STYRK_URL}?q=${sokestreng}`,
        config: {
            ...{redirect: 'manual'},
            headers: getHeaders()
        },
        recoverWith: () => ({'typeaheadYrkeList': []})
    });
}

export function hentFeatureToggles() {
    const parameters = alleFeatureToggles.map(element => 'feature=' + element).join('&');
    return fetchToJson({
        url: `${FEATURE_URL}/?${parameters}`,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        },
        recoverWith: () => ({})
    });
}
