import { combineReducers } from 'redux';
import svar, { SvarState } from './ducks/svar';
import registreringStatus, { RegStatusState } from './ducks/hentRegistreringStatus';
import innloggingsInfo, { InnloggingsInfoState } from './ducks/hentInnloggingsInfo';
import environment, { EnvironmentState } from './ducks/environment';

export interface AppState {
    svar: SvarState;
    registreringStatus: RegStatusState;
    innloggingsInfo: InnloggingsInfoState;
    environment: EnvironmentState;
}

export default combineReducers<AppState>({
    svar,
    registreringStatus,
    innloggingsInfo,
    environment
});