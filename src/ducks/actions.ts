import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as SvarActionTypes } from './svar';
import { ActionTypes as SisteStillingFraAARegActionTypes } from './siste-stilling-fra-aareg';
import { ActionTypes as OversettelseAvStillingFraAARegActionTypes } from './oversettelse-av-stilling-fra-aareg';
import { ActionTypes as RegistrerBrukerActionTypes } from './registrerbruker';

type ActionTypes =
    RegStatusActionTypes |
    InnloggingsinfoActionTypes |
    SvarActionTypes |
    RegistrerBrukerActionTypes |
    OversettelseAvStillingFraAARegActionTypes |
    SisteStillingFraAARegActionTypes;

export default ActionTypes;