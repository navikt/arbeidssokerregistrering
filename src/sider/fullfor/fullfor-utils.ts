import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { Stilling } from '../../ducks/siste-stilling';
import { erSporsmalBesvarte, FremtidigSituasjonSvar, hentSvar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { RegistreringType } from '../../ducks/registreringstatus';

export function erKlarForFullforing(state: AppState): boolean {

    const svar = state.svar;
    const sisteStilling = state.sisteStilling.data.stilling;
    const registreringType = state.registreringStatus.data.registreringType;

    if (registreringType === RegistreringType.SYKMELDT_REGISTRERING) {
        return alleSporsmalErBesvarte(svar, RegistreringType.SYKMELDT_REGISTRERING);
    } else {
        return alleSporsmalErBesvarte(svar, RegistreringType.ORDINAER_REGISTRERING)
            && sisteStillingErSatt(sisteStilling);
    }

}

export function alleSporsmalErBesvarte(svar: SvarState, registreringType: RegistreringType) {

    if (registreringType === RegistreringType.ORDINAER_REGISTRERING) {
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

    if (registreringType === RegistreringType.SYKMELDT_REGISTRERING) {

        const fremtidigSituasjonSvar = hentSvar(svar, SporsmalId.fremtidigSituasjon);

        if (!fremtidigSituasjonSvar) {
            return false;
        }

        switch (fremtidigSituasjonSvar) {
            case FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER  :
                return erSporsmalBesvarte(svar, [SporsmalId.tilbakeIArbeid]);
            case FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING  :
                return erSporsmalBesvarte(svar, [SporsmalId.tilbakeIArbeid]);
            case FremtidigSituasjonSvar.NY_ARBEIDSGIVER:
                return erSporsmalBesvarte(svar, [SporsmalId.utdanning,
                    SporsmalId.utdanningGodkjent, SporsmalId.utdanningBestatt]);
            case FremtidigSituasjonSvar.USIKKER:
                return erSporsmalBesvarte(svar, [SporsmalId.utdanning,
                    SporsmalId.utdanningGodkjent, SporsmalId.utdanningBestatt]);
            case FremtidigSituasjonSvar.INGEN_PASSER:
                return true; // Har ingen flere spørsmål
            default:
                return false;
        }

    }

    return false;
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

function isNullOrUndefined(obj: any) {
    return (obj === null) || (obj === undefined);
}