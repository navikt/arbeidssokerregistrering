import { combineReducers } from 'redux';
import { reducer as formReducer } from 'react-redux-form-validation';
import { FieldState } from 'redux-form';
import svar, { State as SvarState } from './ducks/svar';
import oppsummering, { State as OppsummeringState } from './ducks/oppsummering';
import registreringStatus, { State as RegStatusState } from './ducks/registreringstatus';
import registrerBruker, { State as RegistrerBruker } from './ducks/registrerbruker';
import innloggingsInfo, { State as InnloggingsInfoState } from './ducks/innloggingsinfo';
import sisteArbeidsforhold, { State as SisteArbeidsforholdState } from './ducks/siste-arbeidsforhold';

export interface AppState {
    svar: SvarState;
    oppsummering: OppsummeringState;
    registreringStatus: RegStatusState;
    registrerBruker: RegistrerBruker;
    innloggingsInfo: InnloggingsInfoState;
    sisteArbeidsforhold: SisteArbeidsforholdState;
    form: FieldState;
}

export default combineReducers<AppState>({
    svar,
    oppsummering,
    registreringStatus,
    registrerBruker,
    innloggingsInfo,
    sisteArbeidsforhold,
    form: formReducer
});