import { RegistreringData } from './registrerbruker';
import { State as SvarState } from './svar';
import { Stilling } from './siste-stilling';
import { State as TeksterForBesvarelse } from './tekster-for-besvarelse';

export function mapAvgitteSvarForBackend(
    svar: SvarState,
    sisteStilling: Stilling,
    teksterForBesvarelse: TeksterForBesvarelse
): RegistreringData {
    if (besvarelseErGyldig(svar)) {
        return {
            enigIOppsummering: true,
            sisteStilling: sisteStilling,
            besvarelse: svar,
            oppsummering: '', // TODO Dette tas i senere oppgave. Trenger kanskje oppklaring.
            teksterForBesvarelse: teksterForBesvarelse,
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