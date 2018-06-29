import { SBLARBEID_URL } from '../../ducks/api';
import { Svar } from '../../ducks/svar-utils';
import { svarSuffiksTilTekstId } from '../skjema/skjema-utils';

export function sendBrukerTilSblArbeid() {
    document.location.href = SBLARBEID_URL;
}

export function getTekstIdForOppsummering(sporsmalId: string, svar: Svar) {
    return `${sporsmalId}-svar-${svarSuffiksTilTekstId(svar)}`;
}