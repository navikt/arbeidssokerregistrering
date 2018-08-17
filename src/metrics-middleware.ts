import {ActionTypes as AutentiseringsinfoActionTypes } from './ducks/autentiseringsinfo';
import {ActionTypes as RegistrerbrukerActionTypes } from './ducks/registrerbruker';
import { brukersSvarSamsvarerMedInfoFraAAReg } from './sider/oppsummering/oppsummering-utils';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    const { frontendlogger } = (window as any); // tslint:disable-line:no-any
    
    if (action.type === AutentiseringsinfoActionTypes.HENT_AUTENTISERINGSINFO_OK) {
        const { niva } = action.data;
        if (frontendlogger) {
            frontendlogger.event('registrering.security.level', {'niva': niva}, {});
        }
    }

    // Logg besvarelser utdanning
    let jobbetSeksAvTolvSisteManeder = store.getState().registreringStatus.data.jobbetSeksAvTolvSisteManeder;
    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        const { besvarelse } = action.data;
        if (frontendlogger) {
            frontendlogger.event('registrering.besvarelse.helseHinder',
                                 {'helseHinder': besvarelse.helseHinder}, {});
            frontendlogger.event('registrering.besvarelse.utdanning',
                                 {'utdanning': besvarelse.utdanning}, {});
            frontendlogger.event('registrering.besvarelse.sistestilling.samsvarermedinfofraaareg', {'samsvarermedinfofraareg': brukersSvarSamsvarerMedInfoFraAAReg(besvarelse, jobbetSeksAvTolvSisteManeder)}, {}); // tslint:disable-line:max-line-length
        }
    }
    
    next(action);
};