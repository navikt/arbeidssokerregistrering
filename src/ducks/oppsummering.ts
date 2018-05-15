export enum ActionTypes {
    SETT_OPPSUMMERING = 'SETT_OPPSUMMERING',
}

export interface State {
    tekst?: string;
}

export interface Data {
    tekst: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    tekst: '',
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SETT_OPPSUMMERING: {
            return {...state, tekst: action.data.tekst};
        }
        default : {
            return state;
        }
    }
}

export function settOppsummering(tekst: string) {
    return {
        type: ActionTypes.SETT_OPPSUMMERING,
        data: {
            tekst,
        }
    };
}
