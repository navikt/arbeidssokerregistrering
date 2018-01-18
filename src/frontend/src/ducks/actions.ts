import RegistreringStatus from './registrering-status-modell';
import Svar from './svar-modell';
import InnloggingsInfo from './innloggings-info-modell';

export enum ActionType {
    HENT_REGISTRERINGSTATUS,
    HENTET_REGISTRERINGSTATUS,
    HENT_REGISTRERINGSTATUS_FEILET,

    HENT_INNLOGGINGSINFO,
    HENTET_INNLOGGINGSINFO,
    HENT_INNLOGGINGSINFO_FEILET,

    AVGI_SVAR,
    AVGA_SVAR,
    AVGI_SVAR_FEILET,
}

/*
* RegistreringsStatus
* */

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

/*
* InnloggingsInfo
* */
export interface HentInnloggingsInfoAction {
    type: ActionType.HENT_INNLOGGINGSINFO;
}

export interface HentInnloggingsInfoFeiletAction {
    type: ActionType.HENT_INNLOGGINGSINFO_FEILET;
    // error: Error
}

export interface HentetInnloggingsInfoAction {
    type: ActionType.HENTET_INNLOGGINGSINFO;
    data: InnloggingsInfo;
}

/*
* Avgi svar
* */
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

    | HentInnloggingsInfoAction
    | HentetInnloggingsInfoAction
    | HentInnloggingsInfoFeiletAction
    | AvgiSvarAction
    | AvgaSvarAction
    | AvgiSvarFeiletAction

    // | NesteSporsmalAction
    // | VisAlternativerAction
    // | ForrigeSporsmalAction
    // | ResetAction
    // | EndreSideAction
    ;