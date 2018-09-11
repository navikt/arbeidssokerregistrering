import { State as SvarState } from '../../ducks/svar';
import { Stilling } from '../../ducks/siste-stilling';

export function alleSporsmalErBesvarte(svar: SvarState) {
    return !!svar
        && svar.dinSituasjon
        && svar.sisteStilling
        && svar.utdanning
        && svar.utdanningGodkjent
        && svar.utdanningBestatt
        && svar.helseHinder
        && svar.andreForhold;
}

export function sisteStillingErSatt(stilling: Stilling | undefined) {
    if (stilling === undefined) {
        return false;
    }
    return !isNullOrUndefined(stilling.styrk08)
        && !isNullOrUndefined(stilling.label)
        && (stilling.label !== '')
        && !isNullOrUndefined(stilling.konseptId);
}

function isNullOrUndefined(obj: any) { // tslint:disable-line no-any
    return (obj === null) || (obj === undefined);
}