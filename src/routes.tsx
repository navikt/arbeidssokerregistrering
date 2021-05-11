import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import Banner from "./komponenter/banner/banner";
import ProgressBarContainer from "./komponenter/progress-bar/progress-bar-container";
import Sideanimasjon from "./komponenter/sideanimasjon/sideanimasjon";
import AlleredeRegistrert from "./sider/allerede-registrert/allerede-registrert";
import AlleredeRegistrertFss from "./sider/allerede-registrert-fss/allerede-registrert-fss";
import {
  ALLEREDE_REGISTRERT_PATH,
  DITT_NAV_URL,
  DU_ER_NA_REGISTRERT_PATH,
  FULLFOR_PATH,
  INFOSIDE_PATH,
  INNGANGSSPORSMAL_PATH,
  OPPSUMMERING_PATH,
  REAKTIVERING_PATH,
  SKJEMA_PATH,
  SKJEMA_SYKEFRAVAER_PATH,
  START_PATH,
} from "./utils/konstanter";
import Inngangssporsmal from "./sider/skjema-sykefravaer/inngangssporsmal";
import Infoside from "./sider/infoside/infoside";
import KreverReaktivering from "./sider/krever-reaktivering/krever-reaktivering";
import SkjemaRegistrering from "./sider/skjema-registrering/skjema-registrering";
import SkjemaSykefravaerNyArbeidsgiver from "./sider/skjema-sykefravaer/skjema-sykefravaer-ny-arbeidsgiver";
import SkjemaSykefravaerSammeArbeidsgiver from "./sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver";
import SkjemaSykefravaerSammeArbeidsgiverNyStilling from "./sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver-ny-stilling";
import SkjemaSykefravaerUsikker from "./sider/skjema-sykefravaer/skjema-sykefravaer-usikker";
import OppsummeringSykmeldt from "./sider/oppsummering/oppsummering-sykmeldt";
import Fullfor from "./sider/fullfor/fullfor";
import DuErNaRegistrert from "./sider/registrert/registrert";
import { AppState } from "./reducer";
import { connect, Dispatch } from "react-redux";
import {
  Data as RegistreringstatusData,
  Formidlingsgruppe,
  RegistreringType,
  selectRegistreringstatus,
} from "./ducks/registreringstatus";
import RedirectAll from "./komponenter/redirect-all";
import { selectReaktiveringStatus } from "./ducks/reaktiverbruker";
import { STATUS } from "./ducks/api-utils";
import { erKlarForFullforing } from "./sider/fullfor/fullfor-utils";
import { Data as FeatureToggleData, selectFeatureToggles } from "./ducks/feature-toggles";
import TjenesteOppdateres from "./sider/tjeneste-oppdateres";
import { RouteHerokuMock } from "./mocks/HerokuappEndreMockRegistreringLoep/herokuapp-endre-mock-registrering-loep";
import { setInngangAapAction, setInngangSykefravaerAction } from "./ducks/logger";
import { erIFSS } from "./utils/fss-utils";
import RegistreringArbeidssokerSykmeldtFss from "./sider/startside/registrering-sykmeldt-fss";
import RegistreringArbeidssokerSykmeldt from "./sider/startside/registrering-sykmeldt";
import RegistreringArbeidssokerFss from "./sider/startside/registrering-arbeidssoker-fss";
import RegistreringArbeidssoker from "./sider/startside/registrering-arbeidssoker";
import { uniLogger } from "./metrikker/uni-logger";
import OppsummeringOrdinaer from "./sider/oppsummering/oppsummering-ordinaer";
import { hentQueryParameter } from "./utils/url-utils";

interface StateProps {
  registreringstatusData: RegistreringstatusData;
  reaktivertStatus: string;
  featureToggles: FeatureToggleData;
  state: AppState;
}

interface DispatchProps {
  setInngangFraSykefravaer: () => void;
  setInngangAapAction: () => void;
}

type AllProps = StateProps & RouteComponentProps<any> & DispatchProps;

class Routes extends React.Component<AllProps> {
  kommerFraSykefravaer() {
    const { registreringstatusData, location } = this.props;
    const erFraSykefravaer = hentQueryParameter(location, "fraSykefravaer") === "true";

    return (
      registreringstatusData.registreringType === RegistreringType.SYKMELDT_REGISTRERING &&
      erFraSykefravaer &&
      location.pathname === START_PATH
    );
  }

  kommerAap() {
    return hentQueryParameter(this.props.location, "fraAap") === "true";
  }

  componentDidMount() {
    if (this.kommerAap()) {
      this.props.setInngangAapAction();
    }

    if (this.kommerFraSykefravaer()) {
      this.props.setInngangFraSykefravaer();
    }
  }

  render() {
    const { registreringstatusData, reaktivertStatus, featureToggles, location } = this.props;
    const erNede = featureToggles["arbeidssokerregistrering.nedetid"];
    const {
      registreringType,
      formidlingsgruppe,
      servicegruppe,
      geografiskTilknytning,
      rettighetsgruppe,
      underOppfolging,
    } = registreringstatusData;
    const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
    const visOrdinaerSkjema = !visSykefravaerSkjema;
    const klarForFullforing = erKlarForFullforing(this.props.state);
    const queryParams = location.search;

    if (registreringType === RegistreringType.ALLEREDE_REGISTRERT) {
      if (erIFSS()) {
        return <RedirectAll to={ALLEREDE_REGISTRERT_PATH} component={AlleredeRegistrertFss} />;
      }
      if (formidlingsgruppe === Formidlingsgruppe.ARBS) {
        uniLogger("arbeidssokerregistrering.allerede-registrert.redirect-dittnav", {
          formidlingsgruppe,
          servicegruppe,
          geografiskTilknytning,
          rettighetsgruppe,
          underOppfolging,
        });
        window.location.href = DITT_NAV_URL;
      } else {
        return <RedirectAll to={ALLEREDE_REGISTRERT_PATH} component={AlleredeRegistrert} />;
      }
    } else if (registreringType === RegistreringType.REAKTIVERING && reaktivertStatus !== STATUS.OK) {
      if (erNede) {
        return <RedirectAll to={"/"} component={TjenesteOppdateres} />;
      }
      return <RedirectAll to={REAKTIVERING_PATH} component={KreverReaktivering} />;
    } else if (this.kommerFraSykefravaer()) {
      return <RedirectAll to={INNGANGSSPORSMAL_PATH} component={Inngangssporsmal} />;
    }

    return (
      <>
        {RouteHerokuMock}
        <Route path="/" component={Banner} />
        <Route path="/:url" component={ProgressBarContainer} />

        <Sideanimasjon>
          <Switch>
            {erNede ? <RedirectAll to={"/"} component={TjenesteOppdateres} /> : null}
            {klarForFullforing || reaktivertStatus === STATUS.OK ? (
              <Route path={DU_ER_NA_REGISTRERT_PATH} component={DuErNaRegistrert} />
            ) : null}

            {visOrdinaerSkjema ? (
              <Switch>
                <Route
                  path={START_PATH}
                  component={erIFSS() ? RegistreringArbeidssokerFss : RegistreringArbeidssoker}
                />
                <Route path={`${SKJEMA_PATH}/:id`} component={SkjemaRegistrering} />
                <Route path={FULLFOR_PATH} component={Fullfor} />
                <Route path={OPPSUMMERING_PATH} component={OppsummeringOrdinaer} />
                <Redirect to={START_PATH} />
              </Switch>
            ) : null}
            {visSykefravaerSkjema ? (
              <Switch>
                <Route
                  path={START_PATH}
                  component={erIFSS() ? RegistreringArbeidssokerSykmeldtFss : RegistreringArbeidssokerSykmeldt}
                />
                <Route path={INFOSIDE_PATH} component={Infoside} />
                <Route path={INNGANGSSPORSMAL_PATH} component={Inngangssporsmal} />
                <Route path={`${SKJEMA_SYKEFRAVAER_PATH}/1/:id`} component={SkjemaSykefravaerSammeArbeidsgiver} />
                <Route
                  path={`${SKJEMA_SYKEFRAVAER_PATH}/2/:id`}
                  component={SkjemaSykefravaerSammeArbeidsgiverNyStilling}
                />
                <Route path={`${SKJEMA_SYKEFRAVAER_PATH}/3/:id`} component={SkjemaSykefravaerNyArbeidsgiver} />
                <Route path={`${SKJEMA_SYKEFRAVAER_PATH}/4/:id`} component={SkjemaSykefravaerUsikker} />
                <Route path={OPPSUMMERING_PATH} component={OppsummeringSykmeldt} />
                <Redirect to={START_PATH + queryParams} />
              </Switch>
            ) : null}
          </Switch>
        </Sideanimasjon>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  registreringstatusData: selectRegistreringstatus(state).data,
  reaktivertStatus: selectReaktiveringStatus(state),
  featureToggles: selectFeatureToggles(state),
  state: state,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  setInngangFraSykefravaer: () => dispatch(setInngangSykefravaerAction()),
  setInngangAapAction: () => dispatch(setInngangAapAction()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(withRouter(Routes));
