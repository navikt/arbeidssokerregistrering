import { VEIENTILARBEID_URL } from '../../ducks/api';

export function sendBrukerTilVeientilarbeid() {
    document.location.href = VEIENTILARBEID_URL;
}