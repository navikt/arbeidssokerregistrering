import * as React from "react";
import { connect } from "react-redux";
import { SporsmalId, State as SvarState } from "../../ducks/svar";
import { AppState } from "../../reducer";
import { FormattedMessage } from "react-intl";
import { hentSvar, Svar } from "../../ducks/svar-utils";
import { MessageValue } from "react-intl";
import { getTekstIdForSvar } from "../../komponenter/skjema/skjema-utils";
import {
  Data as RegistreringstatusData,
  RegistreringType,
  selectRegistreringstatus,
} from "../../ducks/registreringstatus";
import { finnLenkeEndreElementForOrdinaer } from "../skjema-registrering/skjema-sporsmalene";
import { hentLenkeEndre } from "../skjema-sykefravaer/skjema-sykefravaer-sporsmalene";
import { hentInngangsLoep } from "../skjema-sykefravaer/inngangssporsmal-svar-alternativene";

interface OwnProps {
  sporsmalId?: SporsmalId;
  tekstId?: string;
  tekst?: string;
  skjul?: boolean;
  skjulHvisSvarErLik?: Svar | Svar[];
  values?: { [key: string]: MessageValue | JSX.Element };
}

interface StateProps {
  svarState: SvarState;
  registreringstatusData: RegistreringstatusData;
}

type Props = OwnProps & StateProps;

class OppsummeringElement extends React.Component<Props> {
  render() {
    const { tekst, values, registreringstatusData } = this.props;

    if (!this.skalViseElement()) {
      return null;
    }

    const tekstTilRendring = tekst ? tekst : <FormattedMessage id={this.getIntlTekstId()} values={values} />;

    const finnSykmeldtlopStien = (sporsmalId: SporsmalId | undefined) => {
      const svar = hentSvar(this.props.svarState, SporsmalId.fremtidigSituasjon);
      const lop = hentInngangsLoep(svar);

      return hentLenkeEndre(sporsmalId, svar, lop);
    };

    const { registreringType } = registreringstatusData;

    const endreLenke =
      RegistreringType.ORDINAER_REGISTRERING === registreringType
        ? finnLenkeEndreElementForOrdinaer({}, "", this.props.sporsmalId)
        : finnSykmeldtlopStien(this.props.sporsmalId);

    return (
      <li className="typo-normal">
        {this.props.children}
        {tekstTilRendring}
        {endreLenke}
      </li>
    );
  }

  getIntlTekstId(): string {
    const { sporsmalId, tekstId, svarState } = this.props;

    if (sporsmalId) {
      return getTekstIdForSvar(sporsmalId, hentSvar(svarState, sporsmalId));
    } else {
      return tekstId || "";
    }
  }

  skalViseElement() {
    const { svarState, sporsmalId, skjulHvisSvarErLik, skjul } = this.props;

    if (skjul) {
      return false;
    }
    if (!sporsmalId || !skjulHvisSvarErLik) {
      return true;
    }
    const svar: Svar | undefined = hentSvar(svarState, sporsmalId);
    if (!svar) {
      return true;
    }
    if (Array.isArray(skjulHvisSvarErLik) && skjulHvisSvarErLik.includes(svar)) {
      return false;
    }
    return skjulHvisSvarErLik !== svar;
  }
}

const mapStateToProps = (state: AppState) => ({
  svarState: state.svar,
  registreringstatusData: selectRegistreringstatus(state).data,
});

export default connect(mapStateToProps)(OppsummeringElement);
