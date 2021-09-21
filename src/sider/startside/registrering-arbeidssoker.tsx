import * as React from "react";
import { connect } from "react-redux";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import "./registrering-arbeidssoker.less";
import { Innholdstittel, Normaltekst, Undertittel, Element, Sidetittel } from "nav-frontend-typografi";
import { Knapp } from "nav-frontend-knapper";
import KnappBase from "nav-frontend-knapper";

import aktplanbilde from "./aktivitetsplan-ill.svg";
import paragrafbilde from "./paragraf.svg";
import infobilde from "./info.svg";
import KommerFra from "../../komponenter/kommer-fra/kommerfra";
import { MatchProps } from "../../utils/utils";
import { SKJEMA_PATH } from "../../utils/konstanter";
import InformasjonModal from "./informasjon/informasjon-modal";
import { AppState } from "../../reducer";
import { Data as FeatureToggleData, selectFeatureToggles } from "../../ducks/feature-toggles";

interface Props {
  featureToggles: FeatureToggleData;
}

type RegistreringArbeidssokerProps = Props & RouteComponentProps<MatchProps>;

interface State {
  isModalOpen: boolean;
}

class RegistreringArbeidssoker extends React.Component<RegistreringArbeidssokerProps, State> {
  state = {
    isModalOpen: false,
  };

  handleSeVideoBtnClicked = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalLukkeknappClicked = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const Rad1 = () => {
      return (
        <div className="registrering-arbeidssoker__rad1">
          <Innholdstittel tag="h2" className="rad__tittel rad1__tittel">
            <FormattedMessage id="registrering-arbeidssoker.introtittel" />
          </Innholdstittel>
          <div className="rad1__innhold">
            <Normaltekst className="rad__innhold-tekst" tag="div">
              <FormattedHTMLMessage id="registrering-arbeidssoker.argument1tekst" tagName="ul" />
              <Knapp onClick={this.handleSeVideoBtnClicked}>
                <FormattedMessage id="registrering-arbeidssoker.argument1knapp" />
              </Knapp>
            </Normaltekst>
            <div className="rad__innhold-ikon">
              <img className="rad1__ikon" src={aktplanbilde} alt="Arbeidssøker-ikon" />
            </div>
          </div>
          <InformasjonModal isOpen={this.state.isModalOpen} onRequestClose={this.handleModalLukkeknappClicked} />
        </div>
      );
    };

    const Rad2 = () => {
      return (
        <div className="registrering-arbeidssoker__rad2 rad-even">
          <div className="rad2-wrapper">
            <div className="rad2__boks rad2__rettigheter">
              <img className="rad__ikon" src={paragrafbilde} alt="Rettigheter" />
              <Undertittel tag="h2" className="rad__tittel rettigheter__tittel">
                <FormattedMessage id="registrering-arbeidssoker.argument2tittel1" />
              </Undertittel>
              <Normaltekst tag="div">
                <FormattedHTMLMessage id="registrering-arbeidssoker.argument2tekst1" />
              </Normaltekst>
            </div>
            <div className="rad2__boks rad2__plikter">
              <img className="rad__ikon" src={infobilde} alt="Plikter" />
              <Undertittel tag="h2" className="rad__tittel plikter__tittel">
                <FormattedMessage id="registrering-arbeidssoker.argument2tittel2" />
              </Undertittel>
              <Normaltekst tag="div">
                <FormattedHTMLMessage id="registrering-arbeidssoker.argument2tekst2" />
              </Normaltekst>
            </div>
          </div>
        </div>
      );
    };

    const Rad3 = () => {
      return (
        <div className="registrering-arbeidssoker__rad3">
          <Innholdstittel tag="h2" className="rad__tittel rad3__tittel">
            <FormattedMessage id="registrering-arbeidssoker.argument3tittel" />
          </Innholdstittel>
          <div className="rad3__tekst">
            <Normaltekst>
              <FormattedMessage id="registrering-arbeidssoker.rad3.del1" />
            </Normaltekst>
            <ul className="typo-normal">
              <li>
                <FormattedMessage id="registrering-arbeidssoker.rad3.punkt1" />
              </li>
              <li>
                <FormattedMessage id="registrering-arbeidssoker.rad3.punkt2" />
              </li>
              <li>
                <FormattedMessage id="registrering-arbeidssoker.rad3.punkt3" />
              </li>
              <li>
                <FormattedMessage id="registrering-arbeidssoker.rad3.punkt4" />
              </li>
            </ul>
            <Normaltekst>
              <FormattedHTMLMessage id="registrering-arbeidssoker.rad3.del2" />
            </Normaltekst>
            <Element tag="h3">
              <FormattedMessage id="registrering-arbeidssoker.rad3.del4.tittel" />
            </Element>
            <Normaltekst>
              <FormattedMessage id="registrering-arbeidssoker.rad3.del4.innhold" />
              <br />
              <FormattedMessage id="registrering-arbeidssoker.rad3.del4.lesmer" />{" "}
              <a className="lenke" href="https://www.nav.no/personvern">
                <FormattedMessage id="registrering-arbeidssoker.rad3.del4.lenke" />
              </a>
            </Normaltekst>
          </div>
          <Normaltekst tag="div" className="rad3__tips">
            <FormattedHTMLMessage id="registrering-arbeidssoker.tipstekst" />
          </Normaltekst>

          <div className="rad3__knapperad">
            <KnappBase
              type="hoved"
              onClick={() => this.props.history.push(`${SKJEMA_PATH}/0`)}
              data-testid="start-registrering"
            >
              <FormattedMessage id="registrering-arbeidssoker-knapp" />
            </KnappBase>
          </div>
        </div>
      );
    };

    const rader = [<Rad1 key={1} />, <Rad2 key={2} />, <Rad3 key={3} />];

    return (
      <div className="registrering-arbeidssoker">
        <KommerFra />
        <div className="banner">
          <Sidetittel>
            <FormattedMessage id="registrering-arbeidssoker.tittel" />
          </Sidetittel>
        </div>
        {rader}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  featureToggles: selectFeatureToggles(state),
});

export default connect(mapStateToProps)(RegistreringArbeidssoker);
