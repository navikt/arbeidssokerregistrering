import * as React from "react";
import { InjectedIntlProps, InjectedIntl, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Normaltekst } from "nav-frontend-typografi";
import { AppState } from "../../../reducer";
import Feilmelding from "../../../komponenter/feilmelding/feilmelding";
import { ErrorTypes as FullforErrorTypes } from "../../../ducks/registrerbruker";
import { Data as FeatureToggleData, selectFeatureToggles } from "../../../ducks/feature-toggles";
import { uniLogger } from "../../../metrikker/uni-logger";
import "./feilmelding-brukers-status-ugyldig.less";
import OppholdsTillatelseKontaktMeg from "../../../komponenter/oppholdstillatelse/KontaktMegController";
import KontaktMeg from "../../../komponenter/utvandret/kontakt-meg";

interface FeilmeldingBrukersStatusUgyldigProps {
  feilType: FullforErrorTypes;
}

interface StateProps {
  featureToggles: FeatureToggleData;
  state: AppState;
}

type AllProps = StateProps & InjectedIntlProps & FeilmeldingBrukersStatusUgyldigProps;

class FeilmeldingBrukersStatusUgyldig extends React.Component<AllProps> {
  lagFeilmelding(feilType: FullforErrorTypes, intl: InjectedIntl) {
    const { messages } = intl;
    let feilmelding;

    if (feilType === FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE) {
      feilmelding = <OppholdsTillatelseKontaktMeg />;
    } else if (feilType === FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET) {
      feilmelding = <KontaktMeg />;
    } else {
      feilmelding = (
        <Feilmelding>
          <div>
            <Normaltekst className="blokk-s">{messages["feilhandtering-overtekst"]}</Normaltekst>
            <Normaltekst>
              <span dangerouslySetInnerHTML={{ __html: messages["feilhandtering-undertekst"] }} />
            </Normaltekst>
          </div>
        </Feilmelding>
      );
    }

    return feilmelding;
  }

  render() {
    const { feilType, intl, state } = this.props;
    const geografiskTilknytning = state.registreringStatus.data
      ? state.registreringStatus.data.geografiskTilknytning || "INGEN_VERDI"
      : "INGEN_DATA";
    const feilmelding = this.lagFeilmelding(feilType, intl);
    uniLogger("arbeidssokerregistrering.error", { feilType: feilType, geografiskTilknytning });

    return <div className="feilhandtering">{feilmelding}</div>;
  }
}

const mapStateToProps = (state: AppState) => ({
  featureToggles: selectFeatureToggles(state),
  state: state,
});

export default connect(mapStateToProps)(injectIntl(FeilmeldingBrukersStatusUgyldig));
