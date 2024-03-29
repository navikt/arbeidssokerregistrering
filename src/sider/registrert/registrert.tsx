import * as React from "react";
import cls from "classnames";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import AvsjekkBilde from "./avsjekk-bilde/avsjekk-bilde";
import { erIE } from "../../utils/ie-test";
import { AppState } from "../../reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { MatchProps } from "../../utils/utils";
import { RegistreringType } from "../../ducks/registreringstatus";
import RegistrertAksjonspanel from "./aksjonspanel/registrert-aksjonspanel";
import ReaktivertAksjonspanel from "./aksjonspanel/reaktivert-aksjonspanel";
import DpSoknadAksjonspanel from "./aksjonspanel/dpsoknad-aksjonspanel";
import RegistrertSendVidere from "./send-videre-fss/registrert-send-videre";
import { uniLogger } from "../../metrikker/uni-logger";
import { hentKommerFra } from "../../komponenter/kommer-fra/kommerfra";
import SendVidereTilVta from "./send-videre-vta/send-videre-til-vta";
import "./registrert.less";
import { erIFSS } from "../../utils/fss-utils";

interface StateProps {
  state: AppState;
}

type AllProps = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class DuErNaRegistrert extends React.Component<AllProps> {
  hentTekstId(erSykmeldt: boolean): (id: string) => string {
    return (id: string) => {
      return `duernaregistrert-${erSykmeldt ? "sykmeldt" : "ordinaer"}-${id}`;
    };
  }

  render() {
    const registreringType = this.props.state.registreringStatus.data.registreringType;
    const geografisk_tilknytning = this.props.state.registreringStatus.data.geografiskTilknytning || "INGEN VERDI";
    const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
    const erReaktivert = registreringType === RegistreringType.REAKTIVERING;
    const ingen_kvittering = this.props.state.featureToggles.data["arbeidssokerregistrering.ingen_kvittering"];
    const hentTekstId = this.hentTekstId(erSykmeldt);
    const tittelId = erIFSS() ? "duernaregistrert-manuell-innholdstittel" : hentTekstId("innholdstittel");
    const kommerFra = hentKommerFra();
    uniLogger("arbeidssokerregistrering.visning", {
      viser: "Viser kvitteringssiden",
      registreringType: registreringType,
    });
    return (
      <>
        <SendVidereTilVta
          erSykmeldt={erSykmeldt}
          ingen_kvittering={ingen_kvittering}
          geografisk_tilknytning={geografisk_tilknytning}
        />
        <section className={cls("registrert", { erIE: erIE(), "registrert-fss": erIFSS() })}>
          <div className={cls("registrert__avsjekk", { "registrert__avsjekk-sykmeldt": erSykmeldt })}>
            <AvsjekkBilde />
            <Systemtittel tag="h1" className="registrert__tittel">
              <FormattedMessage id={tittelId} />
            </Systemtittel>
          </div>
          {erIFSS() ? (
            <RegistrertSendVidere />
          ) : kommerFra ? (
            <DpSoknadAksjonspanel />
          ) : erReaktivert ? (
            <ReaktivertAksjonspanel />
          ) : (
            <RegistrertAksjonspanel
              hentTekstId={this.hentTekstId(erSykmeldt)}
              erSykmeldt={erSykmeldt}
              ingen_kvittering={ingen_kvittering}
              geografisk_tilknytning={geografisk_tilknytning}
            />
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state: state,
});

export default connect(mapStateToProps)(injectIntl(DuErNaRegistrert));
