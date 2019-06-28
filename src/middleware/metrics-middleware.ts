// tslint:disable align no-any max-line-length
import { ActionTypes as AutentiseringsinfoActionTypes } from '../ducks/autentiseringsinfo';
import { ActionTypes as RegistrerbrukerActionTypes } from '../ducks/registrerbruker';
import {
    ActionTypes as RegistreringStatusActionTypes,
    Data as RegStatus,
    RegistreringType,
} from '../ducks/registreringstatus';
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
    loggAutentiseringsinfo(action);
    loggBesvarelse(store, action);
    loggSykmeldt(store, action);
    loggResponstidForTjenestekall(action.type);
    loggFeil(action);
    loggHarStartetRegistrering(action);
    loggRegistreringInngang(store, action);
    loggRegistreringInngangFraAAP(store, action);
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

function loggAutentiseringsinfo(action: Action) {
    if (action.type === AutentiseringsinfoActionTypes.HENT_AUTENTISERINGSINFO_OK) {
        const { niva } = action.data;
        frontendLogger('registrering.security.level', {'niva': niva}, {});
    }
}

function loggSykmeldt(store: any, action: Action) {
    if (action.type === RegistreringStatusActionTypes.HENT_REG_STATUS_OK) {
        if (action.data.registreringType === RegistreringType.SPERRET) {
            frontendLogger('registrering.type.sykmeldt', {}, {});
        }
    }
}

function loggBesvarelse(store: any, action: Action) {
    let stillingForslagFraAareg = store.getState().defaultStilling;
    let valgteStilling = store.getState().sisteStilling.data;

    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        if (stillingForslagFraAareg.stilling.konseptId !== valgteStilling.stilling.konseptId) {
            frontendLogger('registrering.besvarelse.sistestilling.brukerendrerstilling', {'forslagAAreg': stillingForslagFraAareg.stilling, 'brukerbesvarelse': valgteStilling.stilling}, {});
        }
    }
}

function loggRegistreringInngang(store: any, action: Action) {

    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        const kommerFraSykefravaer = store.getState().logger.data.inngangSykefravaer;
        const registreringData = store.getState().registreringStatus.data;
        const registreringType = registreringData.registreringType;
        const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
        const erSperret = registreringType === RegistreringType.SPERRET;

        if (erSykmeldt) {
            frontendLogger('registrering.inngang.sykmeldt', {
                kommerFraSykefravaer
            }, {});
        } else if (erSperret) {
            frontendLogger('registrering.inngang.sperret', {
                kommerFraSykefravaer,
                maksDato: registreringData.maksDato,
                erSykmeldtMedArbeidsgiver: registreringData.erSykmeldtMedArbeidsgiver
            }, {});
        }

    }
}

function loggRegistreringInngangFraAAP(store: any, action: Action) {

    if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
        const registreringType = store.getState().registreringStatus.data.registreringType;
        const inngangFraAap = store.getState().logger.data.inngangFraAap;
        if (inngangFraAap) {
            frontendLogger('registrering.kommerfra', {
                registreringfullfort: true,
                type: registreringType,
                fra: 'AAP'
            }, {});
        }
    }
}

function loggFeil(action: Action) {
    feilTyper.map((feil) => {
        if (action.type === feil.type) {
            if (!action.data) {
                frontendLogger(feil.eventnavn, {'statusText': 'Action data er undefined'}, {});
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

                frontendLogger(feil.eventnavn, {
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

export const loggStartenPaaRegistreringFraAAP = (registreringstatusData: RegStatus) => {
    frontendLogger('registrering.kommerfra', {
        registreringfullfort: false,
        type: registreringstatusData.registreringType,
        fra: 'AAP'
    }, {});
};
