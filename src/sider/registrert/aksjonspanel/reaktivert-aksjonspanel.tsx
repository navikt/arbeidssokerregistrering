import * as React from "react";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import { amplitudeLogger } from "../../../metrikker/amplitude-utils";
import { HEROKU_VEIENTILARBEID_URL, VEIENTILARBEID_URL, DP_SOK_URL } from "../../../utils/konstanter";

import handinfoSvg from "./clipboard.svg";
import "./registrert-aksjonspanel.less";

function ReaktivertAksjonspanel() {
  let veienTilArbeidUrl;
  let veienTilArbeidMedVisInfoUrl;
  const brukHerokuUrl = !!process.env.REACT_APP_HEROKU_OVERGANG;

  if (brukHerokuUrl) {
    const brukerStatusQueryParam = "brukerStatus=" + "ordinaer";

    veienTilArbeidUrl = HEROKU_VEIENTILARBEID_URL + "?" + brukerStatusQueryParam;
    veienTilArbeidMedVisInfoUrl = DP_SOK_URL + "&" + brukerStatusQueryParam;
  } else {
    veienTilArbeidUrl = VEIENTILARBEID_URL;
    veienTilArbeidMedVisInfoUrl = DP_SOK_URL;
  }

  const DagpengerEngelsk = () => {
    return (
      <a
        href={"https://www.nav.no/soknader/en/person/arbeid/dagpenger"}
        className="registrert__lenke knapp knapp--standard"
        onClick={() => {
          amplitudeLogger("registrering.aktivitet", {
            aktivitet: "Går til dagpenger fra reaktivering",
            sprak: "engelsk",
          });
        }}
      >
        <span>Apply for unemployment benefit</span>
      </a>
    );
  };

  return (
    <div className="registrert__aksjonspanel">
      Reaktiveringsorama
      <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon" />
      <div className="registrert__tekster">
        <Systemtittel tag="h2" className="blokk-xs">
          Har du søkt om dagpenger?
        </Systemtittel>
        <Normaltekst className="blokk">
          Er du permittert eller arbeidsledig må du søke om dagpenger i egen søknad.
        </Normaltekst>
        <Normaltekst className="blokk">Du kan tidligst få dagpenger fra den dagen du sender søknaden.</Normaltekst>
        <Normaltekst className="blokk">
          For å ikke tape dager med dagpenger må du sende søknaden senest samme dag som du ønsker dagpenger fra.
        </Normaltekst>
        <div className="registrert__knapperad">
          <DagpengerEngelsk />
          <a
            href={veienTilArbeidMedVisInfoUrl}
            className="registrert__lenke knapp knapp--hoved blokk-m"
            onClick={() => {
              amplitudeLogger("registrering.aktivitet", {
                aktivitet: "Går til dagpenger fra reaktivering",
                sprak: "norsk",
              });
            }}
          >
            Søk dagpenger
          </a>
          <a
            href={veienTilArbeidUrl}
            className="lenke typo-element"
            onClick={() => {
              amplitudeLogger("registrering.aktivitet", {
                aktivitet: "Velger å ikke gå til dagpenger fra reaktivering",
              });
            }}
          >
            Skal ikke søke nå
          </a>
        </div>
      </div>
    </div>
  );
}

export default ReaktivertAksjonspanel;
