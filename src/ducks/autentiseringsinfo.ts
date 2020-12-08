import * as Api from "./api";
import { doThenDispatch, STATUS } from "./api-utils";
import { AppState } from "../reducer";
import { erIFSS } from "../utils/fss-utils";

export enum ActionTypes {
  HENT_AUTENTISERINGSINFO_OK = "HENT_AUTENTISERINGSINFO_OK",
  HENT_AUTENTISERINGSINFO_PENDING = "HENT_AUTENTISERINGSINFO_PENDING",
  HENT_AUTENTISERINGSINFO_FEILET = "HENT_AUTENTISERINGSINFO_FEILET",
}

export interface State {
  data: Data;
  status: string;
}

export enum SecurityLevel {
  Level1 = "Level1",
  Level2 = "Level2",
  Level3 = "Level3",
  Level4 = "Level4",
  Ukjent = "Ukjent",
}

export interface Data {
  securityLevel?: SecurityLevel;
}

interface Action {
  type: ActionTypes;
  data: Data;
}

const initialState = {
  data: {},
  status: STATUS.NOT_STARTED,
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.HENT_AUTENTISERINGSINFO_PENDING:
      if (state.status === STATUS.OK) {
        return { ...state, status: STATUS.RELOADING };
      }
      return { ...state, status: STATUS.PENDING };
    case ActionTypes.HENT_AUTENTISERINGSINFO_FEILET:
      return { ...state, status: STATUS.ERROR };
    case ActionTypes.HENT_AUTENTISERINGSINFO_OK: {
      return { ...state, status: STATUS.OK, data: action.data };
    }
    default:
      return state;
  }
}

export function hentAutentiseringsInfo() {
  return doThenDispatch(
    () => {
      return erIFSS() ? Promise.resolve({ securityLevel: SecurityLevel.Level4 }) : Api.hentAutentiseringsInfo();
    },
    {
      PENDING: ActionTypes.HENT_AUTENTISERINGSINFO_PENDING,
      OK: ActionTypes.HENT_AUTENTISERINGSINFO_OK,
      FEILET: ActionTypes.HENT_AUTENTISERINGSINFO_FEILET,
    }
  );
}

export function selectAutentiseringsinfo(state: AppState): State {
  return state.autentiseringsInfo;
}
