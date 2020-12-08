import * as React from "react";
import { FremtidigSituasjonSvar, Svar } from "../../ducks/svar-utils";
import Alternativ from "../../komponenter/skjema/alternativ";
import {
  nyArbeidsgiverSporsmaleneConfig,
  sammeArbeidsgiverNyStillingSporsmaleneConfig,
  sammeArbeidsgiverSporsmaleneConfig,
  usikkerSporsmaleneConfig,
} from "./skjema-sykefravaer-sporsmalene";

// TODO: fix any
const svarAlternativeConfig = (alternativProps: any) => [
  {
    id: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER,
    element: (
      <Alternativ
        key={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER}
        svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER}
        {...alternativProps}
      />
    ),
    lop: 1,
    lopConfig: sammeArbeidsgiverSporsmaleneConfig,
  },
  {
    id: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING,
    element: (
      <Alternativ
        key={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING}
        svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING}
        {...alternativProps}
      />
    ),
    lop: 2,
    lopConfig: sammeArbeidsgiverNyStillingSporsmaleneConfig,
  },
  {
    id: FremtidigSituasjonSvar.NY_ARBEIDSGIVER,
    element: (
      <Alternativ
        key={FremtidigSituasjonSvar.NY_ARBEIDSGIVER}
        svar={FremtidigSituasjonSvar.NY_ARBEIDSGIVER}
        {...alternativProps}
      />
    ),
    lop: 3,
    lopConfig: nyArbeidsgiverSporsmaleneConfig,
  },
  {
    id: FremtidigSituasjonSvar.USIKKER,
    element: (
      <Alternativ key={FremtidigSituasjonSvar.USIKKER} svar={FremtidigSituasjonSvar.USIKKER} {...alternativProps} />
    ),
    lop: 4,
    lopConfig: usikkerSporsmaleneConfig,
  },
  {
    id: FremtidigSituasjonSvar.INGEN_PASSER,
    element: (
      <Alternativ
        key={FremtidigSituasjonSvar.INGEN_PASSER}
        svar={FremtidigSituasjonSvar.INGEN_PASSER}
        {...alternativProps}
      />
    ),
    lop: 0,
    lopConfig: undefined,
  },
];

export const hentAlternativeneForInngangsporsmal = (alternativProps: {}) =>
  svarAlternativeConfig(alternativProps).map((alternativ) => alternativ.element);

export const hentInngangsLoep = (inngangsLoepSvar: Svar | undefined) => {
  const lop = svarAlternativeConfig({}).find((alternativ) => alternativ.id === inngangsLoepSvar);
  return lop && lop.lop;
};

export const hentLoepConfig = (alternativProps: {}, inngangsLoepSvar: Svar | undefined) => {
  const lop = svarAlternativeConfig(alternativProps).find((alternativ) => alternativ.id === inngangsLoepSvar);
  return lop && lop.lopConfig;
};
