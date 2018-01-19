import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as  InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as  SvarActionTypes } from './svar';

type ActionTypes = RegStatusActionTypes | InnloggingsinfoActionTypes | SvarActionTypes;

export default ActionTypes;