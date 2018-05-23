import { SBLARBEID_URL } from '../../ducks/api';

export function sendBrukerTilSblArbeid() {
    document.location.href = SBLARBEID_URL;
}