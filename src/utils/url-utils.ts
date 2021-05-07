import { AKTIVITETSPLAN_URL } from "./konstanter";
import { hentBrukerFnr, hentVeilederEnhetId } from "./fss-utils";

const url = window && window.location && window.location.href ? window.location.href : "";

export const lagAktivitetsplanUrl = (fnr?: string) => {
  return `${AKTIVITETSPLAN_URL}/${fnr ? fnr : hentBrukerFnr()}?enhet=${hentVeilederEnhetId()}`;
};

export const lagDetaljeVisningUrl = () => {
  return lagAktivitetsplanUrl() + "&visRegistreringDetaljer=true";
};

export const erProduksjon = () => {
  return url.indexOf("arbeidssokerregistrering.nav.no") > -1;
};

export const erNAVMiljo = (miljo: string) =>
  miljo.endsWith(".nav.no") ||
  miljo.endsWith(".adeo.no") ||
  miljo.endsWith(".preprod.local") ||
  miljo.endsWith(".oera.no") ||
  miljo.endsWith(".oera-q.local") ||
  miljo.endsWith(".nav.party");
