import { combineReducers } from 'redux';
import { FieldState } from 'redux-form';
import svar, { State as SvarState } from './ducks/svar';
import reaktiverBruker, { State as ReaktiveringState } from './ducks/reaktiverbruker';
import registreringStatus, { State as RegStatusState } from './ducks/registreringstatus';
import registrerBruker, { State as RegistrerBruker } from './ducks/registrerbruker';
import brukersNavn, { State as BrukersNavnState } from './ducks/brukers-navn';
import autentiseringsInfo, { State as AutentiseringsInfoState } from './ducks/autentiseringsinfo';
import brukersFnr, { State as BrukersFnrState } from './ducks/brukers-fnr';
import sisteStillingFraAAReg, { State as SisteStillingFraAARegState } from './ducks/siste-stilling-fra-aareg';
import featureToggles, { State as FeatureTogglesState } from './ducks/feature-toggles';
import oversettelseAvStillingFraAAReg, {
    State as OversettelseAvStillingFraAARegState
} from './ducks/oversettelse-av-stilling-fra-aareg';
import sisteStilling, { State as SisteStillingState } from './ducks/siste-stilling';
import teksterForBesvarelse, { State as TeksterForBesvarelseState } from './ducks/tekster-for-besvarelse';

export interface AppState {
    svar: SvarState;
    registreringStatus: RegStatusState;
    registrerBruker: RegistrerBruker;
    reaktiverBruker: ReaktiveringState;
    brukersNavn: BrukersNavnState;
    autentiseringsInfo: AutentiseringsInfoState;
    brukersFnr: BrukersFnrState;
    sisteStillingFraAAReg: SisteStillingFraAARegState;
    oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
    sisteStilling: SisteStillingState;
    form: FieldState;
    featureToggles: FeatureTogglesState;
    teksterForBesvarelse: TeksterForBesvarelseState;
}

export default combineReducers<AppState>({
    svar,
    registreringStatus,
    registrerBruker,
    reaktiverBruker,
    brukersNavn,
    autentiseringsInfo,
    brukersFnr,
    oversettelseAvStillingFraAAReg,
    sisteStillingFraAAReg,
    sisteStilling,
    featureToggles,
    teksterForBesvarelse,
});