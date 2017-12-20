import RegistreringStatus from './registrering-status-modell';
import Svar from './svar-modell';

export enum ActionType {
    HENT_REGISTRERINGSTATUS,
    HENTET_REGISTRERINGSTATUS,
    HENT_REGISTRERINGSTATUS_FEILET,

    AVGI_SVAR,
    AVGA_SVAR,
    AVGI_SVAR_FEILET,
}

export interface HentRegisteringStatusAction {
    type: ActionType.HENT_REGISTRERINGSTATUS;
}

export interface HentRegisteringStatusFeiletAction {
    type: ActionType.HENT_REGISTRERINGSTATUS_FEILET;
    // error: Error
}

export interface HentetRegisteringStatusAction {
    type: ActionType.HENTET_REGISTRERINGSTATUS;
    data: RegistreringStatus;
}

export interface AvgiSvarAction {
    type: ActionType.AVGI_SVAR;
    data: Svar;
}

export interface AvgaSvarAction {
    type: ActionType.AVGA_SVAR;
    data: Svar;
}

export interface AvgiSvarFeiletAction {
    type: ActionType.AVGI_SVAR_FEILET;
    // error: Error
}

export type Action =
    HentRegisteringStatusAction
    | HentetRegisteringStatusAction
    | HentRegisteringStatusFeiletAction

    | AvgiSvarAction
    | AvgaSvarAction
    | AvgiSvarFeiletAction

    // | NesteSporsmalAction
    // | VisAlternativerAction
    // | ForrigeSporsmalAction
    // | ResetAction
    // | EndreSideAction
    ;