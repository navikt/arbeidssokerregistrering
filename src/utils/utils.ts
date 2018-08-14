import {State as SvarState} from '../ducks/svar';
import {Stilling} from '../ducks/siste-stilling';
import {RegistreringData} from '../ducks/registrerbruker';

export function hentFornavn(name: string | undefined) {
    return name ? forsteTegnStorBokstav(name).split(' ')[0] : '';
}

function forsteTegnStorBokstav(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function getIntlMessage(messages: { [id: string]: string }, id: string): string {
    return messages[id] || id;
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString().substring(1);
}

export function guid() {
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function mapAvgitteSvarForBackend(
    svar: SvarState,
    sisteStilling: Stilling
): RegistreringData {
    if (besvarelseErGyldig(svar)) {
        return {
            enigIOppsummering: true,
            sisteStilling: sisteStilling,
            besvarelse: svar,
            oppsummering: '', // TODO Dette tas i senere oppgave. Trenger kanskje oppklaring.
        };
    } else {
        return {};
    }
}

export function besvarelseErGyldig(svar: SvarState) {
    return (
        svar.dinSituasjon &&
        svar.sisteStilling &&
        svar.utdanning &&
        svar.utdanningGodkjent &&
        svar.utdanningBestatt &&
        svar.helseHinder &&
        svar.andreForhold
    );
}

export interface MatchProps {
    id: string;
}

export function scrollToBanner() {
    let scrollHeight = 0;
    const header = document.querySelector('.siteheader');
    if (header) {
        scrollHeight = header.getBoundingClientRect().height;
    }
    setTimeout(() => window.scrollTo(0, scrollHeight), 0);
}
