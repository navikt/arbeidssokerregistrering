import RegistreringStatus from './registrering-status-modell';
import Svar from './svar-modell';
import InnloggingsInfo from './innloggings-info-modell';
import { EnvironmentData } from './environment';

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

    HENT_ENVIRONMENT_OK,
    HENT_ENVIRONMENT_PENDING,
    HENT_ENVIRONMENT_ERROR,
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

export interface HentEnvironmentOK {
    type: ActionType.HENT_ENVIRONMENT_OK;
    data: EnvironmentData;
}
export interface HentEnvironmentPENDING {
    type: ActionType.HENT_ENVIRONMENT_PENDING;
}
export interface HentEnvironmentERROR {
    type: ActionType.HENT_ENVIRONMENT_ERROR;
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
    | HentEnvironmentERROR
    | HentEnvironmentOK
    | HentEnvironmentPENDING

    // | NesteSporsmalAction
    // | VisAlternativerAction
    // | ForrigeSporsmalAction
    // | ResetAction
    // | EndreSideAction
    ;