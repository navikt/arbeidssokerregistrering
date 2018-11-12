import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { Stilling } from '../../ducks/siste-stilling';
import { erSporsmalBesvarte } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { RegistreringType } from '../../ducks/registreringstatus';

export function erKlarForFullforing(state: AppState): boolean {

    const svar = state.svar;
    const sisteStilling = state.sisteStilling.data.stilling;
    const registreringType = state.registreringStatus.data.registreringType;

    if (registreringType === RegistreringType.SYKMELDT_REGISTRERING) {
        // TODO: Sjekk at spørsmål pr løp er besvart
        // TODO: Kan bruke alleSporsmalErBesvarte og sende inn reg type
        return true;
    } else {
        return alleSporsmalErBesvarte(svar) && sisteStillingErSatt(sisteStilling);
    }

}

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