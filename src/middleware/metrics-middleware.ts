// tslint:disable align no-any
import { ActionTypes as AutentiseringsinfoActionTypes } from '../ducks/autentiseringsinfo';
import { ActionTypes as RegistrerbrukerActionTypes } from '../ducks/registrerbruker';

import { brukersSvarSamsvarerMedInfoFraAAReg } from '../sider/oppsummering/oppsummering-utils';
import { feilTyper } from './metrics-middleware-util';
import { loggResponstidForTjenestekall } from './responstid-middleware-utils';

export interface Frontendlogger {
    event: (name: string, fields: any, tags: any) => void;
}

type Action = any;

export const metricsMiddleWare = (store: any) => (next: any) => (action: Action) => {
    const frontendlogger: Frontendlogger = (window as any).frontendlogger;
    if (frontendlogger) {
        loggAutentiseringsinfo(action, frontendlogger);
        loggBesvarelse(store, action, frontendlogger);
        loggResponstidForTjenestekall(action.type, frontendlogger);
        loggFeil(action, frontendlogger);
    }
    next(action);
};

function loggAutentiseringsinfo(action: Action, frontendlogger: Frontendlogger) {
    if (action.type === AutentiseringsinfoActionTypes.HENT_AUTENTISERINGSINFO_OK) {
        const { niva } = action.data;
        frontendlogger.event('registrering.security.level', {'niva': niva}, {});
    }
}

function loggBesvarelse(store: any, action: Action, frontendlogger: Frontendlogger) {
    let jobbetSeksAvTolvSisteManeder = store.getState().registreringStatus.data.jobbetSeksAvTolvSisteManeder;
    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        const { besvarelse } = action.data;
        frontendlogger.event('registrering.besvarelse.helseHinder', {'helseHinder': besvarelse.helseHinder}, {});
        frontendlogger.event('registrering.besvarelse.utdanning', {'utdanning': besvarelse.utdanning}, {});
        frontendlogger.event('registrering.besvarelse.sistestilling.samsvarermedinfofraaareg', {'samsvarermedinfofraareg': brukersSvarSamsvarerMedInfoFraAAReg(besvarelse, jobbetSeksAvTolvSisteManeder)}, {}); // tslint:disable-line:max-line-length
    }
}

function loggFeil(action: Action, frontendlogger: Frontendlogger) {
    feilTyper.map((feil) => {
        if (action.type === feil.type) {
            if (!action.data) {
                frontendlogger.event(feil.eventnavn, {'statusText': 'Action data er undefined'}, {});
            } else {
                const response = action.data.response || {};
                const status = response.status;
                const statusText = response.statusText;
                const url = response.url;
                const apikall = feil.apikall;

                const data = action.data;
                data.data = (typeof data.data === 'string') ? escape(data.data) : data.data;

                frontendlogger.event(feil.eventnavn, {
                    'useragent': navigator.userAgent,
                    url,
                    apikall,
                    status,
                    statusText,
                    data
                }, {});
            }
        }
    });
}
