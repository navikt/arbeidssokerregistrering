import { combineReducers } from 'redux';
import svar, { State as SvarState } from './ducks/svar';
import registreringStatus, { State as RegStatusState } from './ducks/registreringstatus';
import registrerBruker, { State as RegistrerBruker } from './ducks/registrerbruker';
import innloggingsInfo, { State as InnloggingsInfoState } from './ducks/innloggingsinfo';
import krr, { State as krrState } from './ducks/krr';

export interface AppState {
    svar: SvarState;
    registreringStatus: RegStatusState;
    registrerBruker: RegistrerBruker;
    innloggingsInfo: InnloggingsInfoState;
    krr: krrState;
}

export default combineReducers<AppState>({
    svar,
    registreringStatus,
    registrerBruker,
    innloggingsInfo,
    krr
});