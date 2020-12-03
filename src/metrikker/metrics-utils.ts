import { Frontendlogger } from '../middleware/metrics-middleware';
export type FrontendLoggerHelper = (eventNavn: string, feltObjekt?: object, tagObjekt?: object) => void;

export function frontendLogger(eventNavn: string, feltObjekt?: object, tagObjekt?: object) {
    const frontendlogger: Frontendlogger = (window as any).frontendlogger;
    if (frontendlogger && frontendlogger.event) {
        frontendlogger.event(eventNavn, feltObjekt || {}, tagObjekt || {});
    }
}
