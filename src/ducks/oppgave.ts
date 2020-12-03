import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    OPPRETT_OPPGAVE_STATUS_OK = 'OPPRETT_OPPGAVE_STATUS_OK',
    OPPRETT_OPPGAVE_STATUS_FEILET = 'OPPRETT_OPPGAVE_STATUS_FEILET',
    OPPRETT_OPPGAVE_STATUS_PENDING = 'OPPRETT_OPPGAVE_STATUS_PENDING'
}

export interface OrdinaereData {
    id?: number;
    tildeltEnhetsnr?: string;
    data?: any;
    response?: any;
}

export type Data = OrdinaereData;

export interface State {
    data: Data;
    status: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    data : {},
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.OPPRETT_OPPGAVE_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.OPPRETT_OPPGAVE_STATUS_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case ActionTypes.OPPRETT_OPPGAVE_STATUS_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function opprettKontaktmegOppgave() {
  return doThenDispatch(() => Api.opprettKontaktmegOppgave(), {
      PENDING: ActionTypes.OPPRETT_OPPGAVE_STATUS_PENDING,
      OK: ActionTypes.OPPRETT_OPPGAVE_STATUS_OK,
      FEILET: ActionTypes.OPPRETT_OPPGAVE_STATUS_FEILET,
  });
}

export function selectOpprettKontaktmegOppgaveResult(state: AppState): State {
    const response = state.oppgaveStatus.data.response;
    const data = state.oppgaveStatus.data.data ? state.oppgaveStatus.data.data : state.oppgaveStatus.data; 
    return {
      status: state.oppgaveStatus.status,
      data: response ? response : data
    };
}
