import { AKTIVITETSPLAN_VEILEDER_URL } from "./konstanter";
import { hentBrukerFnr, hentVeilederEnhetId } from "./fss-utils";

export const lagAktivitetsplanUrl = (fnr?: string) => {
  return `${AKTIVITETSPLAN_VEILEDER_URL}/${fnr ? fnr : hentBrukerFnr()}?enhet=${hentVeilederEnhetId()}`;
};

export const lagDetaljeVisningUrl = () => {
  return lagAktivitetsplanUrl() + "&visRegistreringDetaljer=true";
};

export const erProduksjon = () => {
  const hostname = window.location.hostname;
  return hostname === "arbeidssokerregistrering.nav.no" || hostname === "www.nav.no";
};

type LocationType = { search: string };

export const hentQueryParameter = (location: LocationType, parameter: string): string | null =>
  new URLSearchParams(location.search).get(parameter);

export const erNAVMiljo = (miljo: string) =>
  miljo.endsWith(".nav.no") ||
  miljo.endsWith(".adeo.no") ||
  miljo.endsWith(".preprod.local") ||
  miljo.endsWith(".oera.no") ||
  miljo.endsWith(".oera-q.local") ||
  miljo.endsWith(".nav.party");
