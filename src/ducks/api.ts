import { fetchToJson, leggTilFnrForFSS, leggTilFnrOgEnhetForFSS } from "./api-utils";
import { Data as RegistrerBrukerData } from "./registrerbruker";
import { alleFeatureToggles } from "./feature-toggles";
import { RegistreringType } from "./registreringstatus";

const publicUrl = process.env.PUBLIC_URL || "";
export const VEILARBPERSON_NAVN_URL = `${publicUrl}/veilarbperson/api/person/navn`;
export const AUTENTISERINGSINFO_URL = `${publicUrl}/api/auth`;
export const LOGINSERVICEURL = `${publicUrl}/loginservice/login?redirect=${window.location.origin}${publicUrl}`;
export const VEILARBREGISTRERING_URL = `${publicUrl}/veilarbregistrering/api`;
export const FEATURE_URL = `${publicUrl}/api/feature`;
export const OPPDATER_KONTEKST_URL = `${publicUrl}/modiacontextholder/api/context`;
export const BRUKER_KONTEKST_URL = `${publicUrl}/modiacontextholder/api/context/aktivbruker`;

export const PAM_JANZZ_URL = `${publicUrl}/pam-janzz/rest`;
export const STYRK_URL = `${PAM_JANZZ_URL}/typeahead/yrke-med-styrk08`;

interface BrukerIKontekstData {
  aktivBruker: string;
}

export const getCookie = (name: string) => {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match !== null ? match[1] : "";
};

export function getHeaders() {
  return new Headers({
    "Content-Type": "application/json",
    NAV_CSRF_PROTECTION: getCookie("NAV_CSRF_PROTECTION"),
  });
}

export const MED_CREDENTIALS = {
  credentials: "same-origin" as RequestCredentials,
};

export function hentRegistreringStatus() {
  return fetchToJson({
    url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/startregistrering`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
  });
}

export function registrerBruker(data: RegistrerBrukerData, registreringType: RegistreringType) {
  const endepunkt =
    registreringType === RegistreringType.SYKMELDT_REGISTRERING ? "startregistrersykmeldt" : "startregistrering";

  return fetchToJson({
    url: leggTilFnrOgEnhetForFSS(`${VEILARBREGISTRERING_URL}/${endepunkt}`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify(data),
    },
  });
}

export function startReaktivering() {
  return fetchToJson({
    url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/startreaktivering`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify({}),
    },
  });
}

export function opprettKontaktmegOppgave() {
  return fetchToJson({
    url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/oppgave`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify({ oppgaveType: "OPPHOLDSTILLATELSE" }),
    },
  });
}

export function oppdaterAktivBruker(brukerFnr: string) {
  return fetchToJson({
    url: OPPDATER_KONTEKST_URL,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify({
        eventType: "NY_AKTIV_BRUKER",
        verdi: brukerFnr,
      }),
    },
  });
}

export function hentBrukersNavn() {
  return fetchToJson({
    url: leggTilFnrForFSS(VEILARBPERSON_NAVN_URL),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
  });
}

export function hentKontaktinfo() {
  return fetchToJson({
    url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/person/kontaktinfo`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
  });
}

export function hentAutentiseringsInfo() {
  return fetchToJson({
    url: `${AUTENTISERINGSINFO_URL}`,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
  });
}

export function hentStyrkkodeForSisteStillingFraAAReg() {
  return fetchToJson({
    url: leggTilFnrForFSS(`${VEILARBREGISTRERING_URL}/sistearbeidsforhold`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
    recoverWith: () => ({
      arbeidsgiver: null,
      stilling: null,
      styrk: null,
      fra: null,
      til: null,
    }),
  });
}

export function hentStillingFraPamGittStyrkkode(styrk: string) {
  return fetchToJson({
    url: `${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=${styrk}`,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
    recoverWith: () => ({ konseptMedStyrk08List: [] }),
  });
}

export function hentStillingMedStyrk08(sokestreng: string) {
  return fetchToJson({
    url: `${STYRK_URL}?q=${sokestreng}`,
    config: {
      ...{ redirect: "manual" },
      headers: getHeaders(),
    },
    recoverWith: () => ({ typeaheadYrkeList: [] }),
  });
}

export function hentBrukerIKontekst() {
  return fetchToJson<BrukerIKontekstData>({
    url: BRUKER_KONTEKST_URL,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
  });
}

export function hentFeatureToggles() {
  const parameters = alleFeatureToggles.map((element) => "feature=" + element).join("&");
  return fetchToJson({
    url: `${FEATURE_URL}/?${parameters}`,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
    recoverWith: () => ({}),
  });
}
