import { DinSituasjonSvar, hentSvar, SisteStillingSvar, Svar } from "../../ducks/svar-utils";
import { svarSuffiksTilTekstId } from "../../komponenter/skjema/skjema-utils";
import { SporsmalId, State as SvarState } from "../../ducks/svar";
import { Data as RegStatus } from "../../ducks/registreringstatus";
import oppsummeringConfig from "./ordinaer-oppsummering-config";

const { svarSomIndikererArbeidSisteManeder, svarSomIndikererIngenArbeidSisteManeder } = oppsummeringConfig;

export function getTekstIdForOppsummering(sporsmalId: SporsmalId, svar: Svar | undefined) {
  if (!svar) {
    return "";
  }
  const sporsmalIderDerOppsummeringenSkalTasFraSporsmalstekstene = ["utdanning"];
  const prefiks = sporsmalIderDerOppsummeringenSkalTasFraSporsmalstekstene.includes(sporsmalId) ? "" : "oppsummering-";
  return `${prefiks}${sporsmalId.toLowerCase()}-svar-${svarSuffiksTilTekstId(svar)}`;
}

export function getTekstIdForArbeidSisteManeder(svarState: SvarState, regStatus: RegStatus): string {
  const infoFraAARegIndikererArbeidSisteManeder = regStatus.jobbetSeksAvTolvSisteManeder;
  if (brukersSvarSamsvarerMedInfoFraAAReg(svarState, infoFraAARegIndikererArbeidSisteManeder)) {
    return "";
  }
  return !!infoFraAARegIndikererArbeidSisteManeder
    ? "oppsummering-arbeidserfaring-1"
    : "oppsummering-arbeidserfaring-2";
}

export function brukersSvarSamsvarerMedInfoFraAAReg(
  svarState: SvarState,
  infoFraAARegIndikererArbeidSisteManeder: boolean | undefined
): boolean {
  // Tilfellene 'unknown' og 'undefined' forekommer bare dersom noen har tuklet med programmet, så vi ignorerer det.
  return brukersSvarIndikererArbeidSisteManeder(svarState) === infoFraAARegIndikererArbeidSisteManeder;
}

function brukersSvarIndikererArbeidSisteManeder(svarState: SvarState): boolean | "unknown" {
  const sisteStillingSvar = hentSvar(svarState, SporsmalId.sisteStilling) as SisteStillingSvar;
  const dinSituasjonSvar = hentSvar(svarState, SporsmalId.dinSituasjon) as DinSituasjonSvar;

  if (brukerSvarerAtDenHarJobbetSisteManeder(dinSituasjonSvar, sisteStillingSvar)) {
    return true;
  } else if (brukerSvarerAtDenIkkeHarJobbetSisteManeder(dinSituasjonSvar, sisteStillingSvar)) {
    return false;
  } else {
    return "unknown";
  }
}

function brukerSvarerAtDenHarJobbetSisteManeder(
  dinSituasjonSvar: DinSituasjonSvar | undefined,
  sisteStillingSvar: SisteStillingSvar | undefined
) {
  return (
    svarSomIndikererArbeidSisteManeder.includes(dinSituasjonSvar) ||
    (sisteStillingSvar === SisteStillingSvar.HAR_HATT_JOBB &&
      !svarSomIndikererIngenArbeidSisteManeder.includes(dinSituasjonSvar))
  );
}

function brukerSvarerAtDenIkkeHarJobbetSisteManeder(
  dinSituasjonSvar: DinSituasjonSvar | undefined,
  sisteStillingSvar: SisteStillingSvar | undefined
) {
  return (
    svarSomIndikererIngenArbeidSisteManeder.includes(dinSituasjonSvar) ||
    (sisteStillingSvar === SisteStillingSvar.HAR_IKKE_HATT_JOBB &&
      !svarSomIndikererArbeidSisteManeder.includes(dinSituasjonSvar))
  );
}
