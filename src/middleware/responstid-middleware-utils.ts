import ActionTypes from '../ducks/actions';
import { Frontendlogger } from './metrics-middleware';

const starttider = {};

export function loggResponstidForTjenestekall(actionType: ActionTypes, frontendlogger: Frontendlogger) {

    // tslint:disable
    const type = actionType.toString();
    if (type.includes('_PENDING')) {
        const prefix = getPrefix(type);
        starttider[prefix] = Date.now();
        console.log(starttider);
    }


    if (type.includes('_OK') || type.includes('_FEILET')) {
        const prefix = getPrefix(type);
        if (starttider[prefix] !== undefined) {
            frontendlogger.event(getEventString(prefix), {
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