import { combineReducers } from 'redux';
import { reducer as formReducer } from 'react-redux-form-validation';
import { FieldState } from 'redux-form';
import svar, { State as SvarState } from './ducks/svar';
import registreringStatus, { State as RegStatusState } from './ducks/registreringstatus';
import registrerBruker, { State as RegistrerBruker } from './ducks/registrerbruker';
import innloggingsInfo, { State as InnloggingsInfoState } from './ducks/innloggingsinfo';
import sisteArbeidsforhold, { State as SisteArbeidsforholdState } from './ducks/siste-arbeidsforhold';
import krr, { State as krrState } from './ducks/krr';

export interface AppState {
    svar: SvarState;
    registreringStatus: RegStatusState;
    registrerBruker: RegistrerBruker;
    innloggingsInfo: InnloggingsInfoState;
    krr: krrState;
    sisteArbeidsforhold: SisteArbeidsforholdState;
    form: FieldState;
}

export default combineReducers<AppState>({
    svar,
    registreringStatus,
    registrerBruker,
    innloggingsInfo,
    krr,
    sisteArbeidsforhold,
    form: formReducer
});