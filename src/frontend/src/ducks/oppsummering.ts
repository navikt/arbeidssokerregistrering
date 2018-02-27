export enum ActionTypes {
    SETT_OPPSUMMERING = 'SETT_OPPSUMMERING',
}

export interface State {
    oppsummering?: string;
}

export interface Data {
    oppsummering: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    oppsummering: undefined,
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SETT_OPPSUMMERING: {
            return {...state, oppsummering: action.data.oppsummering};
        }
        default : {
            return state;
        }
    }
}

export function settOppsummering(oppsummering: string) {
    return {
        type: ActionTypes.SETT_OPPSUMMERING,
        data: {
            oppsummering,
        }
    };
}
