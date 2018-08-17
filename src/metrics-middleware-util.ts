import {ActionTypes as RegistreringStatusActionTypes } from './ducks/registreringstatus';
import {ActionTypes as StillingFraAAregActionTypes } from './ducks/siste-stilling-fra-aareg';
import {ActionTypes as ReaktiverBrukerActionTypes } from './ducks/reaktiverbruker';
import {ActionTypes as OversettelseAvStillngFraAAregActionTypes } from './ducks/oversettelse-av-stilling-fra-aareg';
import {ActionTypes as FeatureToggleActionTypes } from './ducks/feature-toggles';
import {ActionTypes as BrukersnavnActionTypes } from './ducks/brukers-navn';

export const feilTyper = [
    {
        type: RegistreringStatusActionTypes.HENT_REG_STATUS_FEILET,
        eventnavn: 'registrering.feil.hentstartregistrering'
    },
    {
        type: RegistreringStatusActionTypes.HENT_REG_STATUS_FEILET,
        eventnavn: 'registrering.feil.startregistrering'
    },
    {
        type: AutentiseringsinfoActionTypes.HENT_AUTENTISERINGSINFO_FEILET,
        eventnavn: 'registrering.feil.autentiseringsinfo'
    },
    {
        type: StillingFraAAregActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_FEILET,
        eventnavn: 'registrering.feil.sistearbeidsforhold'
    },
    {
        type: ReaktiverBrukerActionTypes.REAKTIVER_BRUKER_STATUS_FEILET,
        eventnavn: 'registrering.feil.reaktivering'
    },
    {
        type: OversettelseAvStillngFraAAregActionTypes.HENT_SISTE_STILLING_FEILET,
        eventnavn: 'registrering.feil.hentsistestilling'
    },
    {
        type: FeatureToggleActionTypes.FEATURE_TOGGLES_FEILET,
        eventnavn: 'registrering.feil.featuretoggle'
    },
    {
        type: BrukersnavnActionTypes.HENT_BRUKERS_NAVN_FEILET,
        eventnavn: 'registrering.feil.brukersnavn'
    }
];
