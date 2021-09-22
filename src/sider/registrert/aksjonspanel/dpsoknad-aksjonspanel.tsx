import * as React from "react";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import { amplitudeLogger } from "../../../metrikker/amplitude-utils";
import { HEROKU_VEIENTILARBEID_URL, VEIENTILARBEID_URL, DP_SOK_URL } from "../../../utils/konstanter";

import handinfoSvg from "./clipboard.svg";
import "./registrert-aksjonspanel.less";

function DpSoknadAksjonspanel() {
  let veienTilArbeidUrl;
  let veienTilArbeidMedVisInfoUrl;
  const brukHerokuUrl = !!process.env.REACT_APP_HEROKU_OVERGANG;

  if (brukHerokuUrl) {
    const brukerStatusQueryParam = "brukerStatus=ordinaer";

    veienTilArbeidUrl = `${HEROKU_VEIENTILARBEID_URL}?${brukerStatusQueryParam}`;
    veienTilArbeidMedVisInfoUrl = `${DP_SOK_URL}&${brukerStatusQueryParam}`;
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
            aktivitet: "Går til dagpenger fra kommerFra",
            sprak: "engelsk",
          });
        }}
      >
        <span>Continue to application</span>
      </a>
    );
  };

  React.useEffect(() => {
    amplitudeLogger("registrering.aktivitet", {
      aktivitet: "Viser kvittering etter kommerFra",
    });
  }, []);

  return (
    <div className="registrert__aksjonspanel">
      <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon" />
      <div className="registrert__tekster">
        <Systemtittel tag="h2" className="blokk-xs">
          Du kan fortsette på søknaden om dagpenger
        </Systemtittel>
        <Normaltekst className="blokk">Du kan tidligst få dagpenger fra den dagen du sender søknaden.</Normaltekst>
        <Normaltekst className="blokk">Søknadsdialogen hjelper deg videre.</Normaltekst>
        <div className="registrert__knapperad">
          <DagpengerEngelsk />
          <a
            href={veienTilArbeidMedVisInfoUrl}
            className="registrert__lenke knapp knapp--hoved blokk-m"
            onClick={() => {
              amplitudeLogger("registrering.aktivitet", {
                aktivitet: "Går til dagpenger fra kommerFra",
                sprak: "norsk",
              });
            }}
          >
            Fortsett på søknaden
          </a>
          <a
            href={veienTilArbeidUrl}
            className="lenke typo-element"
            onClick={() => {
              amplitudeLogger("registrering.aktivitet", {
                aktivitet: "Velger å ikke gå til dagpenger fra kommerFra",
              });
            }}
          >
            Ønsker ikke å fortsette nå
          </a>
        </div>
      </div>
    </div>
  );
}

export default DpSoknadAksjonspanel;
