import * as Api from './api';
import { doThenDispatch, FetchState, initialFetchState, STATUS } from './api-utils';
import { Stilling } from './siste-stilling';
import {
    AndreForholdSvar,
    DinSituasjonSvar, FremtidigSituasjonSvar,
    HelseHinderSvar,
    SisteStillingSvar, TilbakeIArbeidSvar, UtdanningBestattSvar,
    UtdanningGodkjentSvar, UtdanningSvar
} from './svar-utils';
import { RegistreringType } from './registreringstatus';

export enum ActionTypes {
    REG_BRUKER_STATUS_OK = 'REG_BRUKER_STATUS_OK',
    REG_BRUKER_STATUS_FEILET = 'REG_BRUKER_STATUS_FEILET',
    REG_BRUKER_STATUS_PENDING = 'REG_BRUKER_STATUS_PENDING'
}

export enum ErrorTypes {
    BRUKER_ER_UKJENT = 'BRUKER_ER_UKJENT',
    BRUKER_KAN_IKKE_REAKTIVERES = 'BRUKER_KAN_IKKE_REAKTIVERES',
    BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET = 'BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET',
    BRUKER_MANGLER_ARBEIDSTILLATELSE = 'BRUKER_MANGLER_ARBEIDSTILLATELSE',
}

export interface State extends FetchState {
    data: Data;
}

interface TekstForSvar {
    sporsmalId: string;
    sporsmal: string;
    svar: string;
}

export type TeksterForBesvarelse = TekstForSvar[];

export interface OrdinaerBesvarelse {
    utdanning: UtdanningSvar;
    utdanningBestatt: UtdanningBestattSvar;
    utdanningGodkjent: UtdanningGodkjentSvar;
    helseHinder: HelseHinderSvar;
    andreForhold: AndreForholdSvar;
    sisteStilling: SisteStillingSvar;
    dinSituasjon: DinSituasjonSvar;
}

export interface SykmeldtBesvarelse {
    utdanning?: UtdanningSvar;
    utdanningBestatt?: UtdanningBestattSvar;
    utdanningGodkjent?: UtdanningGodkjentSvar;
    andreForhold?: AndreForholdSvar;
    fremtidigSituason?: FremtidigSituasjonSvar;
    tilbakeIArbeid?: TilbakeIArbeidSvar;
}

export interface OrdinaerRegistreringData {
    sisteStilling?: Stilling;
    besvarelse?: OrdinaerBesvarelse;
    teksterForBesvarelse?: TeksterForBesvarelse;
}

export interface SykmeldtRegistreringData {
    besvarelse?: SykmeldtBesvarelse;
    teksterForBesvarelse?: TeksterForBesvarelse;
}

export interface ErrorData {
    data: {type: ErrorTypes | string};
}

export type Data = OrdinaerRegistreringData | SykmeldtRegistreringData | ErrorData;

interface Action {
    type: ActionTypes;
    data: Data;
}

export default function (state: State = initialFetchState, action: Action): State {
    switch (action.type) {
        case ActionTypes.REG_BRUKER_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.REG_BRUKER_STATUS_FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case ActionTypes.REG_BRUKER_STATUS_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function utforRegistrering(data: Data, registreringType: RegistreringType) {
    return doThenDispatch(() => Api.registrerBruker(data, registreringType), {
        PENDING: ActionTypes.REG_BRUKER_STATUS_PENDING,
        OK: ActionTypes.REG_BRUKER_STATUS_OK,
        FEILET: ActionTypes.REG_BRUKER_STATUS_FEILET,
    });
}
