import * as React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import { uniLogger } from "../../../metrikker/uni-logger";
import {
  HEROKU_VEIENTILARBEID_URL,
  VEIENTILARBEID_URL,
  DP_SOK_URL,
  VTA_REGISTRERING_FULLORT,
} from "../../../utils/konstanter";

import handinfoSvg from "./clipboard.svg";
import "./registrert-aksjonspanel.less";

interface RegistrertAksjonspanelProps {
  hentTekstId: (id: string) => string;
  erSykmeldt: boolean;
  ingen_kvittering: boolean;
  geografisk_tilknytning: string;
}

const eksperimentkontorer = [
  "030112",
  "030104",
  "030105",
  "030101",
  "030108",
  "030115",
  "4202",
  "3803",
  "110302",
  "110303",
  "030114",
  "3411",
  "3422",
  "3414",
  "3415",
  "3437",
  "3446",
  "3054",
  "3419",
  "3403",
];

class RegistrertAksjonspanel extends React.Component<RegistrertAksjonspanelProps> {
  render() {
    const { hentTekstId, erSykmeldt, ingen_kvittering, geografisk_tilknytning } = this.props;
    const erEksperimentkontor = eksperimentkontorer.includes(geografisk_tilknytning);

    if (!erSykmeldt && ingen_kvittering && erEksperimentkontor) {
      uniLogger("registrering.aktivitet", {
        aktivitet: "Redirecter til veientilarbeid",
      });
      window.location.href = VTA_REGISTRERING_FULLORT;
      return null;
    }

    let veienTilArbeidUrl;
    let veienTilArbeidMedVisInfoUrl;
    let knappetekstJa;
    const brukHerokuUrl = !!process.env.REACT_APP_HEROKU_OVERGANG;

    if (brukHerokuUrl) {
      const brukerStatusQueryParam = "?brukerStatus=" + (erSykmeldt ? "sykmeldt" : "ordinaer");

      veienTilArbeidUrl = HEROKU_VEIENTILARBEID_URL + brukerStatusQueryParam;
      veienTilArbeidMedVisInfoUrl = (erSykmeldt ? HEROKU_VEIENTILARBEID_URL : DP_SOK_URL) + brukerStatusQueryParam;
      knappetekstJa = erSykmeldt ? "duernaregistrert-knapp-les-mer" : "duernaregistrert-knapp-sok-dagpenger";
    } else {
      veienTilArbeidUrl = VEIENTILARBEID_URL;
      veienTilArbeidMedVisInfoUrl = erSykmeldt ? VEIENTILARBEID_URL : DP_SOK_URL;
      knappetekstJa = erSykmeldt ? "duernaregistrert-knapp-les-mer" : "duernaregistrert-knapp-sok-dagpenger";
    }

    const DagpengerEngelsk = () => {
      return (
        <a
          href={"https://www.nav.no/soknader/en/person/arbeid/dagpenger"}
          className="registrert__lenke knapp knapp--standard"
          onClick={() => {
            uniLogger("registrering.vis.dagpenger.info.engelsk");
          }}
        >
          <span>Apply for unemployment benefit</span>
        </a>
      );
    };

    return (
      <div className="registrert__aksjonspanel">
        <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon" />
        <div className="registrert__tekster">
          <Systemtittel tag="h2" className="blokk-xs">
            <FormattedMessage id={hentTekstId("systemtittel")} />
          </Systemtittel>
          <Normaltekst className="blokk">
            <FormattedHTMLMessage id={hentTekstId("normaltekst")} />
          </Normaltekst>
          <div className="registrert__knapperad">
            {knappetekstJa === "duernaregistrert-knapp-sok-dagpenger" && <DagpengerEngelsk />}
            <a
              href={veienTilArbeidMedVisInfoUrl}
              className="registrert__lenke knapp knapp--hoved blokk-m"
              onClick={() => {
                uniLogger("registrering.vis.dagpenger.info");
              }}
            >
              <FormattedMessage id={knappetekstJa} />
            </a>
            <a
              href={veienTilArbeidUrl}
              className="lenke typo-element"
              onClick={() => {
                uniLogger("registrering.ikke.vis.dagpenger.info");
              }}
            >
              <FormattedMessage id="duernaregistrert-knapp-ikke-na" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrertAksjonspanel;
