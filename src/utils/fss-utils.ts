import { parse } from 'query-string';
import { hentBrukerIKontekst, oppdaterAktivBruker } from '../ducks/api';
import { lagAktivitetsplanUrl } from './url-utils';

interface PersonsokEvent extends Event {
    fodselsnummer: string;
}

const EXPIRES_AFTER = 10000; // ms
const BRUKER_FNR_TAG = 'FSS_KONTEKST_BRUKER_FNR';
const ENHET_ID_TAG = 'FSS_KONTEKST_ENHET_ID';
const EXPIRES_AT_TAG = 'FSS_KONTEKST_EXPIRES_AT';

/*
    Forklaring bak lagring av kontekst:

    Når brukere blir manuelt registrert, så skal applikasjonen huske brukeren på tvers av page reloads,
    men hvis brukeren kommer tilbake til arbeidssokerregistrering senere, så skal ikke brukeren ligge i kontekst lenger.
    Dette kan bli løst ved å ha enhetId og fnr som query params under hele registreringen, men siden dette fører til
    mange små endringer i hele applikasjonen, så blir heller session storage med en expire mekansime brukt.
*/

function settSessionBrukerFnr(fnr: string) {
    window.sessionStorage.setItem(BRUKER_FNR_TAG, fnr);
}

function settSessionEnhetId(enhetId: string): void {
    window.sessionStorage.setItem(ENHET_ID_TAG, enhetId);
}

function hentSessionBrukerFnr(): string | null {
    const fnr = window.sessionStorage.getItem(BRUKER_FNR_TAG);
    return hasSessionExpired() ? null : fnr;
}

function hentSessionEnhetId(): string | null {
    const enhetId = window.sessionStorage.getItem(ENHET_ID_TAG);
    return hasSessionExpired() ? null : enhetId;
}

export function startSetExpirationOnUnloadListener(): void {
    window.onbeforeunload = function() {
        setSessionExpiration();
    };
}

export function clearSession(): void {
    window.sessionStorage.removeItem(EXPIRES_AT_TAG);
    window.sessionStorage.removeItem(BRUKER_FNR_TAG);
    window.sessionStorage.removeItem(ENHET_ID_TAG);
}

function setSessionExpiration(): void {
    window.sessionStorage.setItem(EXPIRES_AT_TAG, (Date.now() + EXPIRES_AFTER).toString());
}

export function hasSessionExpired(): boolean {
    const expiresAt = window.sessionStorage.getItem(EXPIRES_AT_TAG);
    return expiresAt != null && parseInt(expiresAt, 10) < Date.now();
}

function oppdaterModiaKontekst() {

    hentBrukerIKontekst().then(res => {
        const brukerIKontekst = res.aktivBruker;
        const brukerFnr = hentBrukerFnr();

        if (brukerFnr && brukerFnr !== brukerIKontekst) {
            oppdaterAktivBruker(brukerFnr).catch();
        }

    }).catch();

}

export function initSessionKontekst(): void {
    const brukerFnr = hentBrukerFnr();
    const enhetId = hentVeilederEnhetId();

    if (brukerFnr) {
        settSessionBrukerFnr(brukerFnr);
    }

    if (enhetId) {
        settSessionEnhetId(enhetId);
    }

    oppdaterModiaKontekst();
}

export function startBrukerFnrEndretListener(): void {
    document.addEventListener(
        'dekorator-hode-personsok', (event: PersonsokEvent) => {
            window.location.href = lagAktivitetsplanUrl(event.fodselsnummer);
        });
}

export function erIFSS(): boolean {

    if (process.env.REACT_APP_MOCK_MANUELL_REGISTRERING) {
        return true;
    }

    const hostname = window.location.hostname;
    return hostname.endsWith('.adeo.no') || hostname.endsWith('.preprod.local');
}

export function hentUrlBrukerFnr(): string | null {
    return parse(window.location.search).fnr;
}

export function hentUrlEnhetId(): string | null {
    return parse(window.location.search).enhetId;
}

export function hentBrukerFnr(): string | null {

    const fnrFraUrl = hentUrlBrukerFnr();

    if (fnrFraUrl) {
        return fnrFraUrl;
    }

    const fnrFraSession = hentSessionBrukerFnr();

    if (fnrFraSession) {
        return fnrFraSession;
    }

    // if (process.env.REACT_APP_MOCK_MANUELL_REGISTRERING) {
    //     return mockedBrukerFnr;
    // }

    return null;
}

export function hentVeilederEnhetId(): string | null {

    const enhetIdFraUrl = hentUrlEnhetId();

    if (enhetIdFraUrl) {
        return enhetIdFraUrl;
    }

    const enhetIdFraSession = hentSessionEnhetId();

    if (enhetIdFraSession) {
        return enhetIdFraSession;
    }

    // if (process.env.REACT_APP_MOCK_MANUELL_REGISTRERING) {
    //     return mockedVeilederEnhetId;
    // }

    return null;
}
