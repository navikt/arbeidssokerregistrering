import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';
import { mapAvgitteSvarForBackend } from '../utils/utils';
import { selectSisteStilling } from './siste-stilling';
import { Data as FeatureTogglesData } from './feature-toggles';

export enum ActionTypes {
    REG_BRUKER_STATUS_OK = 'REG_BRUKER_STATUS_OK',
    REG_BRUKER_STATUS_FEILET = 'REG_BRUKER_STATUS_FEILET',
    REG_BRUKER_STATUS_PENDING = 'REG_BRUKER_STATUS_PENDING'
}

export interface State {
    data: Data;
    status: string;
}

export enum ErrorType {
    BRUKER_FORSVUNNET = 'BRUKER_FORSVUNNET',
    FINNES_IKKE_I_TPS = 'FINNES_IKKE_I_TPS',
    MANGLER_ARBEIDSTILLATELSE = 'MANGLER_ARBEIDSTILLATELSE',
    ANNET = 'ANNET',
}

export interface ErrorData {
    data: string;
    response?: Response;
}

interface OwnData {
    nusKode?: string;
    yrkesPraksis?: string;
    enigIOppsummering?: boolean;
    oppsummering?: string;
    harHelseutfordringer?: boolean;
    yrkesbeskrivelse?: string;
    konseptId?: number;
}

export type Data = OwnData | ErrorData;

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    data: {},
    status: STATUS.OK
};

export default function (state: State = initialState, action: Action): State {
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

export function utforRegistrering(data: Data, featureToggles: FeatureTogglesData) {
    return doThenDispatch(() => Api.registrerBruker(data, featureToggles), {
        PENDING: ActionTypes.REG_BRUKER_STATUS_PENDING,
        OK: ActionTypes.REG_BRUKER_STATUS_OK,
        FEILET: ActionTypes.REG_BRUKER_STATUS_FEILET,
    });
}

export function mapBrukerRegistreringsData(state: AppState): State {
    return {
        data: mapAvgitteSvarForBackend(state.svar, selectSisteStilling(state)),
        status: state.registrerBruker.status
    };
}