import { ActionTypes as RegStatusActionTypes } from './registreringstatus'
import { ActionTypes as BrukersNavnActionTypes } from './brukers-navn'
import { ActionTypes as AutentiseringsinfoActionTypes } from './autentiseringsinfo'
import { ActionTypes as SvarActionTypes } from './svar'
import { ActionTypes as SisteStillingFraAARegActionTypes } from './siste-stilling-fra-aareg'
import { ActionTypes as OversettelseAvStillingFraAARegActionTypes } from './oversettelse-av-stilling-fra-aareg'
import { ActionTypes as OpprettKontaktmegOppgaveActionTypes } from './oppgave'
import { ActionTypes as RegistrerBrukerActionTypes } from './registrerbruker'
import { ActionTypes as ReaktiverBrukerActionTypes } from './reaktiverbruker'
import { ActionTypes as FeatureTogglesActionTypes } from './feature-toggles'
import { ActionTypes as KontaktinfoActionTypes } from './kontaktinfo'

type ActionTypes =
   | RegStatusActionTypes
   | BrukersNavnActionTypes
   | AutentiseringsinfoActionTypes
   | SvarActionTypes
   | RegistrerBrukerActionTypes
   | ReaktiverBrukerActionTypes
   | OversettelseAvStillingFraAARegActionTypes
   | OpprettKontaktmegOppgaveActionTypes
   | SisteStillingFraAARegActionTypes
   | FeatureTogglesActionTypes
   | KontaktinfoActionTypes

export default ActionTypes
