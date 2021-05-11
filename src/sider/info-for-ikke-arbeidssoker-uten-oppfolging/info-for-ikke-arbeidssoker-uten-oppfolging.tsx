import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducer";
import { uniLogger } from "../../metrikker/uni-logger";
import Melding from "./melding";
import "./info-for-ikke-arbeidssoker-uten-oppfolging.less";

interface StateProps {
  state: AppState;
}

class InfoForIkkeArbeidssokerUtenOppfolging extends React.Component<StateProps> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { formidlingsgruppe, servicegruppe, geografiskTilknytning } = this.props.state.registreringStatus.data;
    const underOppfolging = this.props.state.registreringStatus.data.underOppfolging ? "ja" : "nei";
    const rettighetsgruppe = this.props.state.registreringStatus.data.rettighetsgruppe;

    uniLogger("arbeidssokerregistrering.visning", {
      viser: "Viser info for ikke arbeidssoker uten oppfolging",
      formidlingsgruppe,
      servicegruppe,
      geografiskTilknytning,
      underOppfolging,
      rettighetsgruppe,
    });
    return (
      <Melding
        formidlingsgruppe={formidlingsgruppe || "null"}
        servicegruppe={servicegruppe || "null"}
        geografiskTilknytning={geografiskTilknytning || "null"}
        underOppfolging={underOppfolging}
      />
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  state,
});

export default connect(mapStateToProps)(InfoForIkkeArbeidssokerUtenOppfolging);
