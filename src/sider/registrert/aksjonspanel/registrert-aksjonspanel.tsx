import * as React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import { uniLogger } from "../../../metrikker/uni-logger";
import { HEROKU_VEIENTILARBEID_URL, VEIENTILARBEID_URL, DP_SOK_URL } from "../../../utils/konstanter";

import handinfoSvg from "./clipboard.svg";
import "./registrert-aksjonspanel.less";

interface RegistrertAksjonspanelProps {
  hentTekstId: (id: string) => string;
  erSykmeldt: boolean;
  ingen_kvittering: boolean;
  geografisk_tilknytning: string;
}

class RegistrertAksjonspanel extends React.Component<RegistrertAksjonspanelProps> {
  render() {
    const { hentTekstId, erSykmeldt } = this.props;

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
