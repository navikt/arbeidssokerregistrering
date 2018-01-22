import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as  InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as  SvarActionTypes } from './svar';
import { ActionTypes as  KrrActionTypes } from './krr';

type ActionTypes = RegStatusActionTypes | InnloggingsinfoActionTypes | SvarActionTypes | KrrActionTypes;

export default ActionTypes;