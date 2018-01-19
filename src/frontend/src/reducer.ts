import { combineReducers } from 'redux';
import svar, { State as SvarState } from './ducks/svar';
import registreringStatus, { State as RegStatusState } from './ducks/registreringstatus';
import innloggingsInfo, { State as InnloggingsInfoState } from './ducks/innloggingsinfo';

export interface AppState {
    svar: SvarState;
    registreringStatus: RegStatusState;
    innloggingsInfo: InnloggingsInfoState;
}

export default combineReducers<AppState>({
    svar,
    registreringStatus,
    innloggingsInfo,
});