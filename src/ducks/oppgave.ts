import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    OPPRETT_OPPGAVE_STATUS_OK = 'OPPRETT_OPPGAVE_STATUS_OK',
    OPPRETT_OPPGAVE_STATUS_FEILET = 'OPPRETT_OPPGAVE_STATUS_FEILET',
    OPPRETT_OPPGAVE_STATUS_PENDING = 'OPPRETT_OPPGAVE_STATUS_PENDING'
}

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    oppgaveId?: string;
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
            return { ...state, status: STATUS.ERROR };
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

export function selectOpprettKontaktmegOppgaveStatus(state: AppState): string {
  return state.oppgaveStatus.status;
}
