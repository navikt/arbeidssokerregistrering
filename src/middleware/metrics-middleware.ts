// tslint:disable align no-any max-line-length
import { ActionTypes as AutentiseringsinfoActionTypes } from '../ducks/autentiseringsinfo';
import { ActionTypes as RegistrerbrukerActionTypes } from '../ducks/registrerbruker';
import { ActionTypes as RegistreringStatusActionTypes, RegistreringType } from '../ducks/registreringstatus';
import { ActionTypes as SvarActionTypes, SporsmalId } from '../ducks/svar';

import { feilTyper } from './metrics-middleware-util';
import { loggResponstidForTjenestekall } from './responstid-middleware-utils';
import * as _ from 'lodash';
import { frontendLogger } from '../metrikker/metrics-utils';

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
        loggHarStartetRegistrering(action);
        loggRegistreringInngang(store, action, frontendlogger);
        loggRegistreringInngangFraAAP(store, action, frontendlogger);
    }
    next(action);
};

const loggHarStartetRegistreringKunEngang = _.once(() => {
    const frontendlogger: Frontendlogger = (window as any).frontendlogger;
    if (frontendlogger) {
        frontendlogger.event('registrering.harstartetregistrering', {}, {});
    }
});
function loggHarStartetRegistrering(action: Action) {
    if (action.type === SvarActionTypes.AVGI_SVAR) {
        const { sporsmalId } = action.data;
        if (sporsmalId === SporsmalId.dinSituasjon) {
            loggHarStartetRegistreringKunEngang();
        }
    }
}

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
    let stillingForslagFraAareg = store.getState().defaultStilling;
    let valgteStilling = store.getState().sisteStilling.data;

    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        if (stillingForslagFraAareg.stilling.konseptId !== valgteStilling.stilling.konseptId) {
            frontendlogger.event('registrering.besvarelse.sistestilling.brukerendrerstilling', {'forslagAAreg': stillingForslagFraAareg.stilling, 'brukerbesvarelse': valgteStilling.stilling}, {});
        }
    }
}

function loggRegistreringInngang(store: any, action: Action, frontendlogger: Frontendlogger) {

    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        const inngangSykefravaer = store.getState().logger.data.inngangSykefravaer;
        const sykmeldt = store.getState().registreringStatus.data.registreringType === RegistreringType.SYKMELDT_REGISTRERING;

        if (sykmeldt && inngangSykefravaer) {
            frontendlogger.event('registrering.sykmeldt.fra.sykefravaer', {}, {});
        } else if (sykmeldt) {
            frontendlogger.event('registrering.sykmeldt.fra.start', {}, {});
        }

    }
}

function loggRegistreringInngangFraAAP(store: any, action: Action, frontendlogger: Frontendlogger) {

    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        const inngangFraAap = store.getState().logger.data.inngangFraAap;
        if (inngangFraAap) {
            if (action.data.registreringType === RegistreringType.ORDINAER_REGISTRERING) {
                frontendlogger.event('registrering.kommerfra', {
                    registreringfullfort: true,
                    type: RegistreringType.ORDINAER_REGISTRERING,
                    fra: 'AAP'
                }, {});
            } else if (action.data.registreringType === RegistreringType.SYKMELDT_REGISTRERING) {
                frontendlogger.event('registrering.kommerfra', {
                    registreringfullfort: true,
                    type: RegistreringType.SYKMELDT_REGISTRERING,
                    fra: 'AAP'
                }, {});
            }
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

export const loggStartenPaaRegistreringFraAAP = (registreringstatusData) => {
    if (registreringstatusData.registreringType === RegistreringType.ORDINAER_REGISTRERING) {
        frontendLogger('registrering.kommerfra', {
            registreringfullfort: false,
            type: RegistreringType.ORDINAER_REGISTRERING,
            fra: 'AAP'
        }, {});
    } else if (registreringstatusData.registreringType === RegistreringType.SYKMELDT_REGISTRERING) {
        frontendLogger('registrering.kommerfra', {
            registreringfullfort: false,
            type: RegistreringType.SYKMELDT_REGISTRERING,
            fra: 'AAP'
        }, {});
    } else if (registreringstatusData.registreringType === RegistreringType.SPERRET) {
        frontendLogger('registrering.kommerfra', {
            registreringfullfort: false,
            type: RegistreringType.SPERRET,
            fra: 'AAP'
        }, {});
    }
};