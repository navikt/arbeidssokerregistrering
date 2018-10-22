import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { Stilling } from '../../ducks/siste-stilling';
import { erSporsmalBesvarte } from '../../ducks/svar-utils';

export function alleSporsmalErBesvarte(svar: SvarState) {
    return !!svar && erSporsmalBesvarte(svar, [
        SporsmalId.dinSituasjon,
        SporsmalId.sisteStilling,
        SporsmalId.utdanning,
        SporsmalId.utdanningGodkjent,
        SporsmalId.utdanningBestatt,
        SporsmalId.helseHinder,
        SporsmalId.andreForhold,
    ]);
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