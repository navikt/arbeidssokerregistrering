import {ActionTypes as AutentiseringsinfoActionTypes } from './ducks/autentiseringsinfo';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    if (action.type === AutentiseringsinfoActionTypes.HENT_AUTENTISERINGSINFO_OK) {
        const { niva } = action.data;
        const { frontendlogger } = (window as any); // tslint:disable-line
        if (frontendlogger) {
            frontendlogger.event('registrering.security.level', {'niva': niva}, {});
        }
    }
    next(action);
};