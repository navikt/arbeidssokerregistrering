// tslint:disable align no-any max-line-length
import { ActionTypes as AutentiseringsinfoActionTypes } from '../ducks/autentiseringsinfo';
import { ActionTypes as RegistrerbrukerActionTypes } from '../ducks/registrerbruker';
import { ActionTypes as RegistreringStatusActionTypes, RegistreringType } from '../ducks/registreringstatus';

import { brukersSvarSamsvarerMedInfoFraAAReg } from '../sider/oppsummering/oppsummering-utils';
import { feilTyper } from './metrics-middleware-util';
import { loggResponstidForTjenestekall } from './responstid-middleware-utils';
import { mapTilSvarState } from '../ducks/registrerbruker-utils';

export interface Frontendlogger {
    event: (name: string, fields: any, tags: any) => void;
}

type Action = any;

export const metricsMiddleWare = (store: any) => (next: any) => (action: Action) => {
    const frontendlogger: Frontendlogger = (window as any).frontendlogger;
    if (frontendlogger) {
        loggAutentiseringsinfo(action, frontendlogger);
        loggBesvarelse(store, action, frontendlogger);
        loggSykmeldt(store, action, frontendlogger);
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

function loggSykmeldt(store: any, action: Action, frontendlogger: Frontendlogger) {
    if (action.type === RegistreringStatusActionTypes.HENT_REG_STATUS_OK) {
        if (action.data.registreringType === RegistreringType.SPERRET) {
            frontendlogger.event('registrering.type.sykmeldt', {}, {});
        }
    }
}

function loggBesvarelse(store: any, action: Action, frontendlogger: Frontendlogger) {
    let jobbetSeksAvTolvSisteManeder = store.getState().registreringStatus.data.jobbetSeksAvTolvSisteManeder;
    let stillingForslagFraAareg = store.getState().defaultStilling;
    let valgteStilling = store.getState().sisteStilling.data;

    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        const { besvarelse } = action.data;
        frontendlogger.event('registrering.besvarelse.helseHinder', {'helseHinder': besvarelse.helseHinder}, {});
        frontendlogger.event('registrering.besvarelse.utdanning', {'utdanning': besvarelse.utdanning}, {});
        frontendlogger.event('registrering.besvarelse.sistestilling.samsvarermedinfofraaareg',
            {'samsvarermedinfofraareg': brukersSvarSamsvarerMedInfoFraAAReg(mapTilSvarState(besvarelse), jobbetSeksAvTolvSisteManeder)}, {}); // tslint:disable-line:max-line-length

        if (stillingForslagFraAareg.stilling.konseptId !== valgteStilling.stilling.konseptId) {
            frontendlogger.event('registrering.besvarelse.sistestilling.brukerendrerstilling', {'forslagAAreg': stillingForslagFraAareg.stilling, 'brukerbesvarelse': valgteStilling.stilling}, {});
        }
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

                if (typeof data === 'object') {
                    data.data = (typeof data.data === 'string') ? encodeURI(data.data) : data.data;
                }

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