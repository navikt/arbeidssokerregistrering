import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as  InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as  SvarActionTypes } from './svar';
import { ActionTypes as  SisteArbeidsforholdFraAARegActionTypes } from './siste-arbeidsforhold-fra-aareg';
import { ActionTypes as  StillingFraPAMActionTypes } from './stilling-fra-pam';
import { ActionTypes as  RegistrerBrukerActionTypes } from './registrerbruker';

type ActionTypes =
    RegStatusActionTypes |
    InnloggingsinfoActionTypes |
    SvarActionTypes |
    RegistrerBrukerActionTypes |
    StillingFraPAMActionTypes |
    SisteArbeidsforholdFraAARegActionTypes;

export default ActionTypes;