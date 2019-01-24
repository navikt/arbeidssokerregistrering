export const MOCK_REGISTRER_MED_VEILEDER = false;
export const MOCK_START_REGISRERING_STATUS = true;
export const MOCK_REGISTRER_BRUKER = true;
export const MOCK_REAKTIVER_BRUKER = true;
export const MOCK_BRUKERS_NAVN = true;
export const MOCK_AUTENTISERINGS_INFO = true;
export const MOCK_GET_SISTE_ARBIEDSFORHOLD = true;
export const MOCK_POST_SISTE_ARBIEDSFORHOLD = true;
export const MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ = true;
export const MOCK_STYRK08_PAMJANZZ = true;
export const MOCK_FEATURE_TOGGLES = true;
export const PRINT_FRONTENDLOGGER = true;
export const DISPATCH_BESVARELSE = process.env.REACT_APP_MOCK_BES || false;
// Dette dispatcher svarene _før_ noe annet skjer,
// som kan føre til en sær tilstand. Siste test før merge bør skje uten dette flagget.
