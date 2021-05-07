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
import RegistrertSendVidere from "./send-videre-fss/registrert-send-videre";
import { uniLogger } from "../../metrikker/uni-logger";
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
    const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
    const erReaktivert = registreringType === RegistreringType.REAKTIVERING;
    const hentTekstId = this.hentTekstId(erSykmeldt);
    const tittelId = erIFSS() ? "duernaregistrert-manuell-innholdstittel" : hentTekstId("innholdstittel");
    uniLogger("arbeidssokerregistrering.visning", {
      viser: "Viser kvitteringssiden",
      registreringType: registreringType,
    });
    return (
      <section className={cls("registrert", { erIE: erIE(), "registrert-fss": erIFSS() })}>
        <div className={cls("registrert__avsjekk", { "registrert__avsjekk-sykmeldt": erSykmeldt })}>
          <AvsjekkBilde />
          <Systemtittel tag="h1" className="registrert__tittel">
            <FormattedMessage id={tittelId} />
          </Systemtittel>
        </div>
        {erIFSS() ? (
          <RegistrertSendVidere />
        ) : erReaktivert ? (
          <ReaktivertAksjonspanel />
        ) : (
          <RegistrertAksjonspanel hentTekstId={this.hentTekstId(erSykmeldt)} erSykmeldt={erSykmeldt} />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state: state,
});

export default connect(mapStateToProps)(injectIntl(DuErNaRegistrert));
