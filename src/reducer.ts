import { combineReducers } from 'redux';
import { reducer as formReducer } from 'react-redux-form-validation';
import { FieldState } from 'redux-form';
import svar, { State as SvarState } from './ducks/svar';
import registreringStatus, { State as RegStatusState } from './ducks/registreringstatus';
import registrerBruker, { State as RegistrerBruker } from './ducks/registrerbruker';
import innloggingsInfo, { State as InnloggingsInfoState } from './ducks/innloggingsinfo';
import sisteStillingFraAAReg, { State as SisteStillingFraAARegState } from './ducks/siste-stilling-fra-aareg';
import oversettelseAvStillingFraAAReg, {
    State as OversettelseAvStillingFraAARegState
} from './ducks/oversettelse-av-stilling-fra-aareg';
import sisteStilling, { State as SisteStillingState } from './ducks/siste-stilling';

export interface AppState {
    svar: SvarState;
    registreringStatus: RegStatusState;
    registrerBruker: RegistrerBruker;
    innloggingsInfo: InnloggingsInfoState;
    sisteStillingFraAAReg: SisteStillingFraAARegState;
    oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
    sisteStilling: SisteStillingState;
    form: FieldState;
}

export default combineReducers<AppState>({
    svar,
    registreringStatus,
    registrerBruker,
    innloggingsInfo,
    oversettelseAvStillingFraAAReg,
    sisteStillingFraAAReg,
    sisteStilling,
    form: formReducer
});