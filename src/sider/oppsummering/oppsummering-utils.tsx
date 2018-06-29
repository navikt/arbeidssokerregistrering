import { SBLARBEID_URL } from '../../ducks/api';
import { Svar } from '../../ducks/svar-utils';
import { svarSuffiksTilTekstId } from '../skjema/skjema-utils';

export function sendBrukerTilSblArbeid() {
    document.location.href = SBLARBEID_URL;
}

export function getTekstIdForOppsummering(sporsmalId: string, svar: Svar) {
    const sporsmalIderDerOppsummeringenSkalTasFraSporsmalstekstene = [
        'utdanning',
    ];
    const prefiks = sporsmalIderDerOppsummeringenSkalTasFraSporsmalstekstene.includes(sporsmalId)
        ? '' : 'oppsummering-';
    return `${prefiks}${sporsmalId}-svar-${svarSuffiksTilTekstId(svar)}`;
}