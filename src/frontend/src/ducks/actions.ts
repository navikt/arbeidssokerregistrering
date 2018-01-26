import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as  InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as  SvarActionTypes } from './svar';
import { ActionTypes as  KrrActionTypes } from './krr';
import { ActionTypes as  RegistrerBrukerActionTypes } from './registrerbruker';

type ActionTypes =
    RegStatusActionTypes
    | InnloggingsinfoActionTypes
    | SvarActionTypes
    | KrrActionTypes
    | RegistrerBrukerActionTypes;

export default ActionTypes;