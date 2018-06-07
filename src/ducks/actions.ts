import { ActionTypes as RegStatusActionTypes } from './registreringstatus';
import { ActionTypes as InnloggingsinfoActionTypes } from './innloggingsinfo';
import { ActionTypes as AutentiseringsinfoActionTypes } from './autentiseringsinfo';
import { ActionTypes as SvarActionTypes } from './svar';
import { ActionTypes as SisteStillingFraAARegActionTypes } from './siste-stilling-fra-aareg';
import { ActionTypes as OversettelseAvStillingFraAARegActionTypes } from './oversettelse-av-stilling-fra-aareg';
import { ActionTypes as RegistrerBrukerActionTypes } from './registrerbruker';
import { ActionTypes as BrukerInfoActionTypes } from './brukerinfo';
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles';

type ActionTypes =
    BrukerInfoActionTypes |
    RegStatusActionTypes |
    InnloggingsinfoActionTypes |
    AutentiseringsinfoActionTypes |
    SvarActionTypes |
    RegistrerBrukerActionTypes |
    OversettelseAvStillingFraAARegActionTypes |
    SisteStillingFraAARegActionTypes |
    FeatureTogglesActionTypes;

export default ActionTypes;