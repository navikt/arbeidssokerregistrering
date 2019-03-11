import { parse } from 'query-string';
import mockedBrukerFnr from '../mocks/bruker-fnr';
import mockedVeilederEnhetId from '../mocks/veileder-enhet-id';
import { selectBrukerFnr, selectVeilederEnhetId, settFssKontekst } from '../ducks/fss-kontekst';

// Grunnen til at vi henter inn store på denne måten er fordi testene vil krasje grunnet circular dependencies hvis
// modulen blir lastet inn synkront med import
let storeModule;
const getStore = () => {
    if (!storeModule) {
        storeModule = require('../store');
    }
    return storeModule.getStore();
};

interface PersonsokEvent extends Event {
    fodselsnummer: string;
}

export const settPersonIURL = (fodselsnummer: string): void => {
    const fnr = fodselsnummer ? `fnr=${fodselsnummer}` : '';
    const enhetId = `&enhetId=${hentVeilederEnhetId()}`;
    window.location.pathname = `/${fnr}${enhetId}`;
};

export function leggTilBrukerFnrEndretListener(): void {
    document.addEventListener(
        'dekorator-hode-personsok', (event: PersonsokEvent) => {
            settPersonIURL(event.fodselsnummer);
            getStore().dispatch(settFssKontekst({ brukerFnr: event.fodselsnummer }));
        });
}

export function erIFSS(): boolean {

    if (process.env.REACT_APP_MOCK_MANUELL_REGISTRERING) {
        return true;
    }

    const hostname = window.location.hostname;
    return hostname.endsWith('.adeo.no') || hostname.endsWith('.preprod.local');
}

export function initFssVariabler() {
    const brukerFnr = hentBrukerFnr();
    const veilederEnhetId = hentVeilederEnhetId();
    getStore().dispatch(settFssKontekst({ brukerFnr, veilederEnhetId }));
}

export function hentBrukerFnr(): string | null {

    const search = parse(window.location.search);

    if (search.fnr) {
        return search.fnr;
    }

    const state = getStore().getState();
    const storedBrukerFnr = selectBrukerFnr(state);

    if (storedBrukerFnr) {
        return storedBrukerFnr;
    }

    if (process.env.REACT_APP_MOCK_MANUELL_REGISTRERING) {
        return mockedBrukerFnr;
    }

    return null;
}

export function hentVeilederEnhetId(): string | null {

    const search = parse(window.location.search);

    if (search.enhetId) {
        return search.enhetId;
    }

    const state = getStore().getState();
    const storedVeilederEnhetId = selectVeilederEnhetId(state);

    if (storedVeilederEnhetId) {
        return storedVeilederEnhetId;
    }

    if (process.env.REACT_APP_MOCK_MANUELL_REGISTRERING) {
        return mockedVeilederEnhetId;
    }

    return null;

}
