import { ActionType } from './types';
import Svar from './svar-modell';

export interface SvarState {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
}

interface AvgiSvarAction {
    type: ActionType.AVGI_SVAR;
    data: Svar;
}

interface AvgaSvarAction {
    type: ActionType.AVGA_SVAR;
    data: Svar;
}

interface AvgiSvarFeiletAction {
    type: ActionType.AVGI_SVAR_FEILET;
    // error: Error
}

interface AvgiSvarInitState {
    type: ActionType.AVGI_SVAR_INITIAL_STATE;
}

type Action = AvgiSvarAction | AvgaSvarAction | AvgiSvarFeiletAction | AvgiSvarInitState;

const initialState = {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined
};

export default function (state: SvarState = initialState, action: Action): SvarState {
    switch (action.type) {
        case ActionType.AVGI_SVAR: {
            return {...state, [action.data.sporsmalId]: action.data.alternativId};
        }
        case ActionType.AVGI_SVAR_INITIAL_STATE: {
            return initialState;
        }
        default : {
            return state;
        }
    }
}

export function endreSvarAction(sporsmalId: string, alternativId: string) {
    return {
        type: ActionType.AVGI_SVAR,
        data: {
            sporsmalId,
            alternativId
        }
    };
}

export function setInitalState() {
    return {
        type: ActionType.AVGI_SVAR_INITIAL_STATE
    };
}