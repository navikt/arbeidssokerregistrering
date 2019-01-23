
export enum ActionTypes {
    INNGANG_SYKEFRAVAER = 'INNGANG_SYKEFRAVAER',
}

export interface Data {
    inngangSykefravaer: boolean;
}

export interface State {
    data: Data;
}

const initialState = {
    data: {
        inngangSykefravaer: false
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