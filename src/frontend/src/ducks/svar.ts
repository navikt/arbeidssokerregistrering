const AVGI_SVAR = 'AVGI_SVAR';
const INITIAL_STATE = 'INITIAL_STATE';

export interface SvarState {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
}

interface Action {
    type: string;
    data: {
        alternativId: string;
        sporsmalId: string;
    };
}

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
        case AVGI_SVAR: {
            return {...state, [action.data.sporsmalId]: action.data.alternativId};
        }
        case INITIAL_STATE: {
            return initialState;
        }
        default : {
            return state;
        }
    }
}

export function endreSvarAction(sporsmalId: string, alternativId: string) {
    return {
        type: AVGI_SVAR,
        data: {
            sporsmalId,
            alternativId
        }
    };
}

export function setInitalState() {
    return {
        type: INITIAL_STATE
    };
}