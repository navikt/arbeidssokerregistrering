
export const ordinaerRegistreringRespons = {
    'id' : 55,
    'yrkesPraksis' : '5223',
    'opprettetDato' : '2018-06-06T00:00:00+02:00',
    'besvarelse': {
        'utdanning': 'HOYERE_UTDANNING_5_ELLER_MER',
        'utdanningBestatt': 'NEI',
        'utdanningGodkjent': 'JA',
        'helseHinder': 'JA',
        'andreForhold': 'JA',
        'sisteStilling': 'INGEN_SVAR',
        'dinSituasjon': 'JOBB_OVER_2_AAR'
    },
    'sisteStilling': {
        'label': 'Operatør innen trelastproduksjon',
        'konseptId': 23140,
        'styrk08': '8172'
    }

};

export const manglerArbeidstillatelseFeilResponse = {
    'id': 'fa5ec8e51366d8b9722bb564f2534e7e',
    'type': 'BRUKER_MANGLER_ARBEIDSTILLATELSE',
};

export const utvandretFeilResponse = {
    'id': 'fa5ec8e51366d8b9722bb564f2534e7e',
    'type': 'BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET',
};

export const sykmeldtRegistreringRespons = {};

export const registreringFeilrespons = {
    'id': 'fa5ec8e51366d8b9722bb564f2534e7e',
    'type': 'BRUKER_KAN_IKKE_REAKTIVERES',
    'detaljer': {
        'detaljertType': 'no.nav.apiapp.feil.Feil',
        'feilMelding': 'BRUKER_KAN_IKKE_REAKTIVERES',
        'stackTrace': 'no.nav.apiapp.feil.Feil: BRUKER_KAN_IKKE_REAKTIVERES'
    }
};
