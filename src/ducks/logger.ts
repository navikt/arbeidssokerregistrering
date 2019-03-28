
export enum ActionTypes {
    INNGANG_SYKEFRAVAER = 'INNGANG_SYKEFRAVAER',
    INNGANG_AAP = 'INNGANG_AAP',
}

export interface Data {
    inngangSykefravaer: boolean;
    inngangFraAap: boolean;
}

export interface State {
    data: Data;
}

const initialState = {
    data: {
        inngangSykefravaer: false,
        inngangFraAap: false
    },
};

interface Action {
    type: ActionTypes;
    data: Data;
}

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.INNGANG_SYKEFRAVAER:
            return { ...state, data: action.data };
        case ActionTypes.INNGANG_AAP:
            return { ...state, data: action.data };
        default:
            return state;
    }
}

export function setInngangSykefravaerAction() {
    return {
        type: ActionTypes.INNGANG_SYKEFRAVAER,
        data: {
            inngangSykefravaer: true
        }
    };
}

export function setInngangAapAction() {
    return {
        type: ActionTypes.INNGANG_AAP,
        data: {
            inngangFraAap: true
        }
    };
}