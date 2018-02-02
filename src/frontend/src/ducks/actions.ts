import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as  InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as  SvarActionTypes } from './svar';
import { ActionTypes as  KrrActionTypes } from './krr';
import { ActionTypes as  SisteArbeidsforholdActionTypes } from './siste-arbeidsforhold';

type ActionTypes =
    RegStatusActionTypes |
    InnloggingsinfoActionTypes |
    SvarActionTypes |
    KrrActionTypes |
    SisteArbeidsforholdActionTypes;

export default ActionTypes;