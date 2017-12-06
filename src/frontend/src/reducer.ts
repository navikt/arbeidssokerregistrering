import { combineReducers } from "redux";
import svar, { SvarState} from './ducks/svar';

export interface AppState {
    svar: SvarState
}

export default combineReducers<AppState>({
});