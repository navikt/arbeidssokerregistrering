import { EnigIOppsummering } from '../ducks/registrerbruker';

const registreringRespons = {
    'id' : 55,
    'yrkesPraksis' : '5223',
    'opprettetDato' : '2018-06-06T00:00:00+02:00',
    'enigIOppsummering' : EnigIOppsummering.JA,
    'oppsummering' : '-',
    'harHelseutfordringer' : false,
};
export default registreringRespons;

export const registreringFeilrespons = {
    'id': 'fa5ec8e51366d8b9722bb564f2534e7e',
    'type': 'BRUKER_KAN_IKKE_REAKTIVERES',
    'detaljer': {
        'detaljertType': 'no.nav.apiapp.feil.Feil',
        'feilMelding': 'BRUKER_KAN_IKKE_REAKTIVERES',
        'stackTrace': 'no.nav.apiapp.feil.Feil: BRUKER_KAN_IKKE_REAKTIVERES'
    }
};
