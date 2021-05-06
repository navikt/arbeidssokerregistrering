import * as React from "react";
import { connect, Dispatch } from "react-redux";
import {
  hentStyrkkodeForSisteStillingFraAAReg,
  selectSisteStillingFraAAReg,
  State as SisteArbeidsforholdState,
  Data as SisteArbeidsforholdData,
} from "../../ducks/siste-stilling-fra-aareg";
import { AppState } from "../../reducer";
import {
  hentStillingFraPamGittStyrkkode,
  selectSisteStillingNavnFraPam,
  selectOversettelseAvStillingFraAAReg,
  State as OversettelseAvStillingFraAARegState,
  Data as OversettelseAvStillingFraAARegData,
  Data as OversettelseAvStillingData,
} from "../../ducks/oversettelse-av-stilling-fra-aareg";
import { ingenYrkesbakgrunn, selectSisteStilling, Stilling, velgSisteStilling } from "../../ducks/siste-stilling";
import Innholdslaster from "../../komponenter/innholdslaster/innholdslaster";
import Loader from "../../komponenter/loader/loader";
import { hentOversattStillingFraAAReg, UTEN_STYRKKODE } from "./sporsmal/sporsmal-siste-stilling/siste-stilling-utils";
import { STATUS } from "../../ducks/api-utils";
import FeilmeldingGenerell from "../../komponenter/feilmelding/feilmelding-generell";
import { settDefaultStilling } from "../../ducks/default-stilling";

interface StateProps {
  sisteStillingFraAAReg: SisteArbeidsforholdState;
  oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
  labelTilStillingFraAAReg: string;
  sisteStilling: Stilling;
}

interface DispatchProps {
  hentStyrkkodeForSisteStillingFraAAReg: () => Promise<void | unknown>;
  hentStillingFraPamGittStyrkkode: (styrk98: string | undefined) => Promise<void | unknown>;
  velgStilling: (stilling: Stilling) => void;
  settDefaultStilling: (stilling: Stilling) => void;
}

type Props = StateProps & DispatchProps;
class LastInnSisteStilling extends React.Component<Props> {
  componentDidMount() {
    const velgStilling = (stilling: Stilling) => {
      this.props.velgStilling(stilling);
    };
    if (this.props.sisteStillingFraAAReg.status === STATUS.NOT_STARTED) {
      this.props.hentStyrkkodeForSisteStillingFraAAReg().then((responseSisteArbeidsforhold) => {
        const { styrk } = responseSisteArbeidsforhold as SisteArbeidsforholdData;

        this.props.hentStillingFraPamGittStyrkkode(styrk).then((responseOversettelseAvStillingFraAAReg) => {
          const stilling: Stilling = this.getDefaultSisteStilling(
            responseOversettelseAvStillingFraAAReg as OversettelseAvStillingFraAARegData,
            styrk
          );
          velgStilling(stilling);
          this.props.settDefaultStilling(stilling);
        });
      });
    }
  }

  getDefaultSisteStilling(
    oversettelseAvSisteStilling: OversettelseAvStillingData,
    styrk: string | undefined
  ): Stilling {
    if (styrk === undefined || styrk === UTEN_STYRKKODE) {
      return ingenYrkesbakgrunn;
    }

    return hentOversattStillingFraAAReg(oversettelseAvSisteStilling);
  }

  render() {
    const { sisteStillingFraAAReg, oversettelseAvStillingFraAAReg } = this.props;

    return (
      <Innholdslaster
        feilmeldingKomponent={<FeilmeldingGenerell />}
        avhengigheter={[sisteStillingFraAAReg, oversettelseAvStillingFraAAReg]}
        storrelse="XXL"
        loaderKomponent={<Loader />}
      >
        {this.props.children}
      </Innholdslaster>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  sisteStillingFraAAReg: selectSisteStillingFraAAReg(state),
  oversettelseAvStillingFraAAReg: selectOversettelseAvStillingFraAAReg(state),
  labelTilStillingFraAAReg: selectSisteStillingNavnFraPam(state),
  sisteStilling: selectSisteStilling(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  hentStyrkkodeForSisteStillingFraAAReg: () => dispatch(hentStyrkkodeForSisteStillingFraAAReg()),
  hentStillingFraPamGittStyrkkode: (styrk: string) => dispatch(hentStillingFraPamGittStyrkkode(styrk)),
  velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
  settDefaultStilling: (stilling: Stilling) => dispatch(settDefaultStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LastInnSisteStilling);
