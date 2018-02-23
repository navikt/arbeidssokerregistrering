export enum ActionTypes {
    AVGI_SVAR = 'AVGI_SVAR',
    AVGI_SVAR_RESET = 'AVGI_SVAR_RESET'
}

export interface State {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
}

export interface Data {
    alternativId: string;
    sporsmalId: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.AVGI_SVAR: {
            return {...state, [action.data.sporsmalId]: action.data.alternativId};
        }
        case ActionTypes.AVGI_SVAR_RESET: {
            return initialState;
        }
        default : {
            return state;
        }
    }
}

export function endreSvarAction(sporsmalId: string, alternativId: string) {
    return {
        type: ActionTypes.AVGI_SVAR,
        data: {
            sporsmalId,
            alternativId
        }
    };
}

export function setInitalState() {
    return {
        type: ActionTypes.AVGI_SVAR_RESET
    };
}