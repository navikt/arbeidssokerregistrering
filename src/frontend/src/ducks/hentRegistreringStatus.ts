export const HENT_REGISTRERING_STATUS = 'HENT_REGISTRERING_STATUS';
export const MOTTA_REGISTRERING_STATUS = 'MOTTA_REGISTRERING_STATUS';

export interface RegStatusState {
    erUnderOppfolging?: boolean;
    oppfyllerKrav?: boolean;
}

interface Action {
    type: string;
}

const initialState = {
    erUnderOppfolging: false,
    oppfyllerKrav: true,
};

export default function (state: RegStatusState = initialState, action: Action): RegStatusState {
    switch (action.type) {
        case MOTTA_REGISTRERING_STATUS: {
            return {...state, erUnderOppfolging: true};
        }
        default : {
            return state;
        }
    }
}

function mottattRegistreringStatus(registreringStatus: {}) {
    return {
        type: MOTTA_REGISTRERING_STATUS,
        data: {
            registreringStatus,
        }
    };
}

export function hentRegistreringStatus(fnr: string) {
    return (dispatch: any) => {
        return fetch(`localhost` + '/' + fnr)
            .then(json => {
                return dispatch(mottattRegistreringStatus(json));
            });
    };
}