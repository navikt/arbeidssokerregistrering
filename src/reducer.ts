import { combineReducers } from 'redux';
import { FieldState } from 'redux-form';
import svar, {State as SvarState } from './ducks/svar';
import reaktiverBruker, {State as ReaktiveringState } from './ducks/reaktiverbruker';
import registreringStatus, {State as RegStatusState } from './ducks/registreringstatus';
import registrerBruker, {State as RegistrerBruker } from './ducks/registrerbruker';
import brukersNavn, {State as BrukersNavnState } from './ducks/brukers-navn';
import autentiseringsInfo, {State as AutentiseringsInfoState } from './ducks/autentiseringsinfo';
import sisteStillingFraAAReg, {State as SisteStillingFraAARegState } from './ducks/siste-stilling-fra-aareg';
import featureToggles, {State as FeatureTogglesState } from './ducks/feature-toggles';
import oversettelseAvStillingFraAAReg, {
    State as OversettelseAvStillingFraAARegState
} from './ducks/oversettelse-av-stilling-fra-aareg';
import defaultStilling, {State as DefaultStillingState } from './ducks/default-stilling';
import sisteStilling, {State as SisteStillingState } from './ducks/siste-stilling';

export interface AppState {
    svar: SvarState;
    registreringStatus: RegStatusState;
    registrerBruker: RegistrerBruker;
    reaktiverBruker: ReaktiveringState;
    brukersNavn: BrukersNavnState;
    autentiseringsInfo: AutentiseringsInfoState;
    sisteStillingFraAAReg: SisteStillingFraAARegState;
    oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
    defaultStilling: DefaultStillingState;
    sisteStilling: SisteStillingState;
    form: FieldState;
    featureToggles: FeatureTogglesState;
}

export default combineReducers<AppState>({
    svar,
    registreringStatus,
    registrerBruker,
    reaktiverBruker,
    brukersNavn,
    autentiseringsInfo,
    oversettelseAvStillingFraAAReg,
    sisteStillingFraAAReg,
    defaultStilling,
    sisteStilling,
    featureToggles,
});