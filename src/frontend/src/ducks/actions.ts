import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as  InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as  SvarActionTypes } from './svar';
import { ActionTypes as  SisteArbeidsforholdActionTypes } from './siste-arbeidsforhold';
import { ActionTypes as  StillingFraPAMActionTypes } from './stilling-fra-pam';
import { ActionTypes as  RegistrerBrukerActionTypes } from './registrerbruker';

type ActionTypes =
    RegStatusActionTypes |
    InnloggingsinfoActionTypes |
    SvarActionTypes |
    RegistrerBrukerActionTypes |
    StillingFraPAMActionTypes |
    SisteArbeidsforholdActionTypes;

export default ActionTypes;