import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';
import { getMapJaNeiKanskje, getMapNusKode, getMapSituasjon } from '../utils/utils';

export enum ActionTypes {
    REG_BRUKER_STATUS_OK = 'REG_BRUKER_STATUS_OK',
    REG_BRUKER_STATUS_FEILET = 'REG_BRUKER_STATUS_FEILET',
    REG_BRUKER_STATUS_PENDING = 'REG_BRUKER_STATUS_PENDING'
}

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    nusKode?: string;
    yrkesPraksis?: string;
    enigIOppsummering?: boolean;
    oppsummering?: string;
    utdanningBestatt?: boolean;
    utdanningGodkjentNorge?: boolean;
    harJobbetSammenhengende?: boolean;
    harHelseutfordringer?: boolean;
    situasjon?: string;
}

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
            return {...state, status: STATUS.ERROR};
        case ActionTypes.REG_BRUKER_STATUS_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function utforRegistrering(data: Data) {
    return doThenDispatch(() => Api.registrerBruker(data), {
        PENDING: ActionTypes.REG_BRUKER_STATUS_PENDING,
        OK: ActionTypes.REG_BRUKER_STATUS_OK,
        FEILET: ActionTypes.REG_BRUKER_STATUS_FEILET,
    });
}

export function lagBrukerRegistreringsData(state: AppState): State {
    const svr1 = state.svar[1];
    const svr2 = state.svar[2];
    const svr3 = state.svar[3];
    const svr4 = state.svar[4];
    const svr5 = state.svar[5];

    let data = {};
    if (svr1 && svr2 && svr3 && svr4 && svr5) {
        data = {
            nusKode: getMapNusKode(svr2),
            yrkesPraksis: '',
            enigIOppsummering: true,
            oppsummering: '',
            utdanningBestatt: getMapJaNeiKanskje(svr3),
            utdanningGodkjentNorge: getMapJaNeiKanskje(svr4),
            harHelseutfordringer: getMapJaNeiKanskje(svr5),
            situasjon: getMapSituasjon(svr1),
        };
    }

    return {
        data,
        status: state.registrerBruker.status
    };
}