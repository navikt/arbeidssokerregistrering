import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { AppState } from "../../reducer";
import { hentBrukersNavn, selectBrukersNavn, State as BrukersNavnState } from "../../ducks/brukers-navn";
import { hentKontaktinfo } from "../../ducks/kontaktinfo";
import {
  Data as AuthData,
  hentAutentiseringsInfo,
  SecurityLevel,
  selectAutentiseringsinfo,
  State as AuthState,
} from "../../ducks/autentiseringsinfo";
import {
  hentRegistreringStatus,
  selectRegistreringstatus,
  State as RegistreringstatusState,
} from "../../ducks/registreringstatus";
import {
  hentFeatureToggles,
  selectFeatureTogglesState,
  Data as FeatureToggleData,
  State as FeatureToggleState,
} from "../../ducks/feature-toggles";
import Innholdslaster from "../innholdslaster/innholdslaster";
import StepUp from "./stepup";
import TjenesteOppdateres from "../../sider/tjeneste-oppdateres";
import { STATUS } from "../../ducks/api-utils";
import Loader from "../loader/loader";
import FeilmeldingGenerell from "../feilmelding/feilmelding-generell";
import { erIFSS } from "../../utils/fss-utils";
import { uniLogger } from "../../metrikker/uni-logger";

interface StateProps {
  brukersNavn: BrukersNavnState;
  autentiseringsinfo: AuthState;
  registreringstatus: RegistreringstatusState;
  featuretoggles: FeatureToggleState;
}

interface DispatchProps {
  hentBrukersNavn: () => Promise<void | unknown>;
  hentAutentiseringsInfo: () => Promise<void | unknown>;
  hentRegistreringStatus: () => void;
  hentFeatureToggle: () => Promise<void | unknown>;
  hentKontaktinfo: () => Promise<void | unknown>;
}

type Props = StateProps & DispatchProps;

function videresendTilNyIngress() {
  const { location } = window;
  const devHostnames = ["arbeid.dev.nav.no"];
  const prodHostnames = ["www.nav.no"];

  if (devHostnames.includes(location.hostname)) {
    location.href = "https://arbeid.dev.nav.no/arbeid/registrering-ny";
    uniLogger("registrering.gcp.redirect", { target: "gcp dev" });
  } else if (prodHostnames.includes(location.hostname)) {
    uniLogger("registrering.gcp.redirect", { target: "gcp prod" });
    location.href = "https://www.nav.no/arbeid/registrering-ny";
  }
}

export class HentInitialData extends React.Component<Props> {
  componentDidMount() {
    this.props.hentFeatureToggle().then((featureToggles) => {
      if (featureToggles && (featureToggles as FeatureToggleData)["arbeidssokerregistrering.ny-ingress"]) {
        videresendTilNyIngress();
      }
      this.props.hentAutentiseringsInfo().then((res) => {
        if ((res as AuthData).securityLevel === SecurityLevel.Level4) {
          this.props.hentRegistreringStatus();
          this.props.hentBrukersNavn();
          this.props.hentKontaktinfo();
          this.props.hentFeatureToggle();
        }
      });
    });
  }

  render() {
    const { children, registreringstatus, autentiseringsinfo, brukersNavn, featuretoggles } = this.props;
    const { securityLevel } = autentiseringsinfo.data;
    const erNede = featuretoggles.data["arbeidssokerregistrering.nedetid"];
    if (erNede) {
      return <TjenesteOppdateres />;
    } else if (autentiseringsinfo.status === STATUS.OK) {
      if (securityLevel !== SecurityLevel.Level4) {
        // Bruker mangler Oidc-token på nivå 4.
        // Sender derfor bruker til step-up-side med forklaring og Logg-inn-knapp.
        if (securityLevel === SecurityLevel.Level3) {
          uniLogger("registrering.niva3");
        }
        return <StepUp />;
      }
    }

    const feilmelding =
      erIFSS() && registreringstatus.status === STATUS.ERROR
        ? "feilhandtering-ikke-tilgang-aareg"
        : "feilmelding-generell";

    return (
      <Innholdslaster
        feilmeldingKomponent={<FeilmeldingGenerell tekstId={feilmelding} />}
        avhengigheter={[registreringstatus, brukersNavn, autentiseringsinfo, featuretoggles]}
        storrelse="XXL"
        loaderKomponent={<Loader />}
      >
        {children}
      </Innholdslaster>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  autentiseringsinfo: selectAutentiseringsinfo(state),
  brukersNavn: selectBrukersNavn(state),
  registreringstatus: selectRegistreringstatus(state),
  featuretoggles: selectFeatureTogglesState(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  hentBrukersNavn: () => dispatch(hentBrukersNavn()),
  hentAutentiseringsInfo: () => dispatch(hentAutentiseringsInfo()),
  hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
  hentFeatureToggle: () => dispatch(hentFeatureToggles()),
  hentKontaktinfo: () => dispatch(hentKontaktinfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);
