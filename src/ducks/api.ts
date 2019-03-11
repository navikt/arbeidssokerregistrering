import { fetchToJson, leggTilFnrForFSS, leggTilFnrOgEnhetForFSS } from './api-utils';
import { Data as RegistrerBrukerData } from './registrerbruker';
import { alleFeatureToggles } from './feature-toggles';
import { RegistreringType } from './registreringstatus';
import { ARBEIDSSOKERREGISTRERING_START_PATH } from '../utils/konstanter';

export const VEILARBPERSON_NAVN_URL = '/veilarbperson/api/person/navn';
export const AUTENTISERINGSINFO_URL = '/veilarbstepup/status';
export const VEILARBSTEPUP = `/veilarbstepup/oidc?url=${ARBEIDSSOKERREGISTRERING_START_PATH}`;
export const VEILARBREGISTRERING_URL = '/veilarbregistrering/api';
export const FEATURE_URL = '/api/feature';
export const KONTEKST_URL = '/modiacontextholder/api/context';
export const BRUKER_KONTEKST_URL = '/modiacontextholder/api/context/aktivbruker';
export const ENHET_KONTEKST_URL = '/modiacontextholder/api/context/aktivenhet';

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
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    });
}

const MED_CREDENTIALS = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentRegistreringStatus() {

    return fetchToJson({
        url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/startregistrering`),
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
        url: leggTilFnrOgEnhetForFSS(`${VEILARBREGISTRERING_URL}/${endepunkt}`),
        config: { ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify(data)
        }
    });

}

export function startReaktivering() {
    return fetchToJson({
        url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/startreaktivering`),
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify({})
        }
    });
}

export function oppdaterAktivBruker(brukerFnr: string) {
    return fetchToJson({
        url: leggTilFnrForFSS(KONTEKST_URL),
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify({
                eventType: 'NY_AKTIV_BRUKER',
                verdi: brukerFnr,
            })
        }
    });
}

export function hentBrukersNavn() {
    return fetchToJson({
        url: leggTilFnrForFSS(VEILARBPERSON_NAVN_URL),
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
        url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/sistearbeidsforhold`),
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

export function hentBrukerIKontekst() {
    return fetchToJson({
        url: BRUKER_KONTEKST_URL,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        }
    });
}

export function hentEnhetIKontekst() {
    return fetchToJson({
        url: ENHET_KONTEKST_URL,
        config: {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        }
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
