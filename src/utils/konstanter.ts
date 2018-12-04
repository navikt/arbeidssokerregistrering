export const basename = '/arbeidssokerregistrering';
export const INNGANGSSPORSMAL_PATH = '/inngangssporsmal';
export const START_PATH = '/start';
export const SKJEMA_PATH = '/skjema';
export const SKJEMA_SYKEFRAVAER_PATH = '/skjema-sykefravaer';
export const OPPSUMMERING_PATH = '/oppsummering';
export const FULLFOR_PATH = '/fullfor';
export const DU_ER_NA_REGISTRERT_PATH = '/duernaregistrert';
export const ALLEREDE_REGISTRERT_PATH = '/allerederegistrert';
export const REAKTIVERING_PATH = '/reaktivering';
export const IKKE_ARBEIDSSSOKER_UTENFOR_OPPFOLGING_PATH = '/ikke-arbeidssoker-utenfor-oppfolging';
export const INFOSIDE_PATH = '/infoside';
export const ARBEIDSSOKERREGISTRERING_START_PATH = '/arbeidssokerregistrering/start';

// URLer til andre applikasjoner
const herokuUrl = 'https://veientilarbeid.herokuapp.com';
const vanligUrl = '/veientilarbeid';

export const HEROKU_VEIENTILARBEID_URL = herokuUrl;
export const HEROKU_VEIENTILARBEID_MED_DAGPENGER_URL = `${herokuUrl}/?visInformasjonsmodul=true&visdagpenger=true`;
export const HEROKU_VEIENTILARBEID_MED_AAP_URL = `${herokuUrl}/?visAap=true`;

export const VEIENTILARBEID_URL = vanligUrl;
export const VEIENTILARBEID_MED_DAGPENGER_URL = `${vanligUrl}?visInformasjonsmodul=true&visdagpenger=true`;
export const VEIENTILARBEID_MED_AAP_URL = `${vanligUrl}/?visAap=true`;

export const DITT_NAV_URL = '/dittnav';
export const DITT_SYKEFRAVAER_URL = '/sykefravaer';

// Besvarelser
export const YRKESPRAKSIS = '5120.14'; // hard kodet inntil videre