export const INNGANGSSPORSMAL_PATH = "/inngangssporsmal";
export const START_PATH = "/start";
export const SKJEMA_PATH = "/skjema";
export const SKJEMA_SYKEFRAVAER_PATH = "/skjema-sykefravaer";
export const OPPSUMMERING_PATH = "/oppsummering";
export const FULLFOR_PATH = "/fullfor";
export const DU_ER_NA_REGISTRERT_PATH = "/duernaregistrert";
export const ALLEREDE_REGISTRERT_PATH = "/allerederegistrert";
export const REAKTIVERING_PATH = "/reaktivering";
export const IKKE_ARBEIDSSSOKER_UTENFOR_OPPFOLGING_PATH = "/ikke-arbeidssoker-utenfor-oppfolging";
export const INFOSIDE_PATH = "/infoside";
export const ARBEIDSSOKERREGISTRERING_START_PATH = "/start";

export const BASE_PATH = process.env.PUBLIC_URL || "";

// URLer til andre applikasjoner
const herokuUrl = "https://veientilarbeid.herokuapp.com/veientilarbeid";
const vanligUrl = `${BASE_PATH}/veientilarbeid/`;

export const HEROKU_VEIENTILARBEID_URL = herokuUrl;

export const VEIENTILARBEID_URL = vanligUrl;

export const DITT_NAV_URL = `${BASE_PATH}/dittnav`;
export const VTA_REGISTRERING_FULLORT = `${DITT_NAV_URL}?goTo=registrering`;
export const VTA_REAKTIVERING_FULLORT = `${DITT_NAV_URL}?goTo=registrering&visKvittering=reaktivering`;
export const DITT_SYKEFRAVAER_URL = `${BASE_PATH}/sykefravaer`;

export const AKTIVITETSPLAN_URL = "/veilarbpersonflatefs";

export const DP_SOK_URL = "https://www.nav.no/soknader/nb/person/arbeid/dagpenger";

export const DIALOG_URL = `${BASE_PATH}/aktivitetsplan/dialog/ny/`;

export const AMPLITUDE_API_KEY_TEST = "2f190e67f31d7e4719c5ff048ad3d3e6";
export const AMPLITUDE_API_KEY_PROD = "b0bccdd4dd75081606ef7bcab668a7ed";
export const AMPLITUDE_ENDPOINT = "amplitude.nav.no/collect";

// Besvarelser
export const YRKESPRAKSIS = "5120.14"; // hard kodet inntil videre
