import * as React from "react";
import * as Sentry from "@sentry/react";
import cls from "classnames";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import AvsjekkBilde from "./avsjekk-bilde/avsjekk-bilde";
import { erIE } from "../../utils/ie-test";
import { AppState } from "../../reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { hentRegistreringsResultat } from "../../ducks/api";
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

function hentTekstId(erSykmeldt: boolean): (id: string) => string {
  return (id: string) => {
    return `duernaregistrert-${erSykmeldt ? "sykmeldt" : "ordinaer"}-${id}`;
  };
}

function DuErNaRegistrert(props: AllProps) {
  const [registreringsData, setRegistreringsData] = React.useState();
  const registreringType = props.state.registreringStatus.data.registreringType;
  const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
  const erReaktivert = registreringType === RegistreringType.REAKTIVERING;
  const alder = props.state.registreringStatus.data.alder;
  const getTekstId = hentTekstId(erSykmeldt);
  const tittelId = erIFSS() ? "duernaregistrert-manuell-innholdstittel" : getTekstId("innholdstittel");

  React.useEffect(() => {
    uniLogger("arbeidssokerregistrering.success", { registreringType: registreringType, alder });
  }, []);

  React.useEffect(() => {
    function getRegistreringsData() {
      hentRegistreringsResultat()
        .then((data: any) => {
          setRegistreringsData(data);
        })
        .catch((error) => {
          Sentry.captureException(error);
        });
    }
    getRegistreringsData();
  }, []);

  React.useEffect(() => {
    if (registreringsData) {
      console.log(registreringsData);
    }
  }, [registreringsData]);

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
        <RegistrertAksjonspanel hentTekstId={hentTekstId(erSykmeldt)} erSykmeldt={erSykmeldt} />
      )}
    </section>
  );
}

const mapStateToProps = (state: AppState) => ({
  state: state,
});

export default connect(mapStateToProps)(injectIntl(DuErNaRegistrert));
