export interface TogglesConfig {
  visVeileder?: boolean;
}

export interface Markup {
  etterSokefelt?: string;
}

export interface ControlledContextvalue<T> extends BaseContextvalue<T> {
  value: string | null;
  onChange(value: string | null): void;
}
export interface UncontrolledContextvalue<T> extends BaseContextvalue<T> {
  initialValue: string | null;
  onChange?(value: string | null): void;
}

export interface BaseContextvalue<T> {
  display: T;
  skipModal?: boolean;
  ignoreWsEvents?: boolean;
}

export type Contextvalue<T> = ControlledContextvalue<T> | UncontrolledContextvalue<T>;

export enum EnhetDisplay {
  ENHET = "ENHET",
  ENHET_VALG = "ENHET_VALG",
}

export enum FnrDisplay {
  SOKEFELT = "SOKEFELT",
}

export type EnhetContextvalue = Contextvalue<EnhetDisplay>;
export type FnrContextvalue = Contextvalue<FnrDisplay>;
export type ProxyConfig = boolean | string;

export interface ApplicationProps {
  appname: string;
  fnr?: FnrContextvalue;
  enhet?: EnhetContextvalue;
  toggles?: TogglesConfig;
  markup?: Markup;
  useProxy?: ProxyConfig;
  accessToken?: string;
}
