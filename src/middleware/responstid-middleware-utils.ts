import ActionTypes from '../ducks/actions';
import { frontendLogger, FrontendLoggerHelper } from '../metrikker/metrics-utils';

interface StartTiderType {
    [propName: string]: number;
}

const starttider: StartTiderType = {};

export function loggResponstidForTjenestekall(actionType: ActionTypes) {
    loggResponstid(actionType, frontendLogger);
}

export function loggResponstid(actionType: ActionTypes, logger: FrontendLoggerHelper) {
    const type = actionType.toString();
    if (type.includes('_PENDING')) {
        const prefix = getPrefix(type);
        starttider[prefix] = Date.now();
    }

    if (type.includes('_OK') || type.includes('_FEILET')) {
        const prefix = getPrefix(type);
        if (starttider[prefix] !== undefined) {
            logger(getEventString(prefix), {
                responstid: Date.now() - starttider[prefix],
            }, {});
        }
    }
}

function getEventString(prefix: string) {
    return 'registrering.responstid.' + prefix;
}

function getPrefix(type: string) {
    return type.toLowerCase()
        .split('_')
        .slice(0, -1)
        .join('-');
}
