import { combineReducers } from 'redux';
import { reducer as formReducer } from 'react-redux-form-validation';
import { FieldState } from 'redux-form';
import svar, { State as SvarState } from './ducks/svar';
import oppsummering, { State as OppsummeringState } from './ducks/oppsummering';
import registreringStatus, { State as RegStatusState } from './ducks/registreringstatus';
import registrerBruker, { State as RegistrerBruker } from './ducks/registrerbruker';
import innloggingsInfo, { State as InnloggingsInfoState } from './ducks/innloggingsinfo';
import sisteStillingFraAAReg, { State as SisteStillingFraAARegState } from './ducks/siste-stilling-fra-aareg';
import oversettelseAvStillingFraAAReg, { State as OversettelseAvStillingFraAARegState } from './ducks/oversettelse-av-stilling-fra-aareg';
import sisteStilling, { State as SisteStillingState } from './ducks/siste-stilling';

export interface AppState {
    svar: SvarState;
    oppsummering: OppsummeringState;
    registreringStatus: RegStatusState;
    registrerBruker: RegistrerBruker;
    innloggingsInfo: InnloggingsInfoState;
    sisteArbeidsforhold: SisteStillingFraAARegState;
    stillingFraPam: OversettelseAvStillingFraAARegState;
    sisteStilling: SisteStillingState;
    form: FieldState;
}

export default combineReducers<AppState>({
    svar,
    oppsummering,
    registreringStatus,
    registrerBruker,
    innloggingsInfo,
    stillingFraPam: oversettelseAvStillingFraAAReg,
    sisteArbeidsforhold: sisteStillingFraAAReg,
    sisteStilling,
    form: formReducer
});