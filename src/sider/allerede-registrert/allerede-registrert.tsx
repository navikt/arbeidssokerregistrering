import * as React from "react";
import { connect } from "react-redux";
import { Column, Row } from "nav-frontend-grid";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Normaltekst } from "nav-frontend-typografi";
import GraaBakgrunn from "../../komponenter/graa-bakgrunn/graa-bakgrunn";
import Banner from "../../komponenter/banner/banner";
import { uniLogger } from "../../metrikker/uni-logger";
import { AppState } from "../../reducer";
import IARBSMelding from "./iarbs-melding";

import "./allerede-registrert.less";
import { AKTIVITETSPLAN_URL, DIALOG_URL, VEIENTILARBEID_URL } from "../../utils/konstanter";
interface StateProps {
  state: AppState;
}
type Props = InjectedIntlProps & StateProps;

class AlleredeRegistrert extends React.Component<Props> {
  handleClickAktivitetsplan(event) {
    const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
    const servicegruppe = event.currentTarget.dataset.servicegruppe;
    const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
    const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
    uniLogger("registrering.aktivitet", {
      aktivitet: "Går til aktivitetsplanen fra allerede registrert siden",
      formidlingsgruppe,
      servicegruppe,
      geografiskTilknytning,
      rettighetsgruppe,
    });
  }

  handleClickVeienTilArbeid(event) {
    const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
    const servicegruppe = event.currentTarget.dataset.servicegruppe;
    const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
    const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
    uniLogger("registrering.aktivitet", {
      aktivitet: "Går til veien til arbeid fra allerede registrert siden",
      formidlingsgruppe,
      servicegruppe,
      geografiskTilknytning,
      rettighetsgruppe,
    });
  }

  handleClickDialog(event) {
    const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
    const servicegruppe = event.currentTarget.dataset.servicegruppe;
    const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
    const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
    uniLogger("registrering.aktivitet", {
      aktivitet: "Går til dialogen fra allerede registrert siden",
      formidlingsgruppe,
      servicegruppe,
      geografiskTilknytning,
      rettighetsgruppe,
    });
  }

  render() {
    const messages = this.props.intl.messages;
    const formidlingsgruppe = this.props.state.registreringStatus.data.formidlingsgruppe;
    const servicegruppe = this.props.state.registreringStatus.data.servicegruppe;
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe || "INGEN_VERDI";
    const servicegruppeOrIngenVerdi = servicegruppe || "INGEN_VERDI";
    const geografiskTilknytning = this.props.state.registreringStatus.data.geografiskTilknytning || "INGEN_VERDI";
    const rettighetsgruppe = this.props.state.registreringStatus.data.rettighetsgruppe;
    const isIARBS = formidlingsgruppeOrIngenVerdi === "IARBS";
    uniLogger("arbeidssokerregistrering.visning", {
      viser: "Viser allerede registrert siden",
      formidlingsgruppe,
      servicegruppe,
      geografiskTilknytning,
      rettighetsgruppe,
    });
    return (
      <div>
        <Banner />
        <div className="allerede-registrert">
          <GraaBakgrunn />
          {isIARBS ? <IARBSMelding /> : null}
          <Row className="">
            <Column xs="12" sm="8" className="allerede-registrert__boks">
              <div className="allerede-registrert__boks-innhold">
                <Normaltekst className="allerede-registrert__boks-tekst">
                  {messages["allerede-registrert-boks-1-tekst"]}
                </Normaltekst>
                <a
                  href={AKTIVITETSPLAN_URL}
                  className="allerede-registrert__knapp knapp"
                  onClick={this.handleClickAktivitetsplan}
                  data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                  data-servicegruppe={servicegruppeOrIngenVerdi}
                  data-geografisktilknytning={geografiskTilknytning}
                  data-rettighetsgruppe={rettighetsgruppe}
                >
                  {messages["allerede-registrert-boks-1-knapp"]}
                </a>
              </div>
            </Column>
          </Row>
          <Row className="">
            <Column xs="12" sm="8" className="allerede-registrert__boks">
              <div className="allerede-registrert__boks-innhold">
                <Normaltekst className="allerede-registrert__boks-tekst">
                  {messages["allerede-registrert-boks-2-tekst"]}
                </Normaltekst>
                <a
                  href={VEIENTILARBEID_URL}
                  className="allerede-registrert__knapp knapp"
                  onClick={this.handleClickVeienTilArbeid}
                  data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                  data-servicegruppe={servicegruppeOrIngenVerdi}
                  data-geografisktilknytning={geografiskTilknytning}
                  data-rettighetsgruppe={rettighetsgruppe}
                >
                  {messages["allerede-registrert-boks-2-knapp"]}
                </a>
              </div>
            </Column>
          </Row>
          <Row className="">
            <Column xs="12" sm="8" className="allerede-registrert__boks">
              <div className="allerede-registrert__boks-innhold">
                <Normaltekst className="allerede-registrert__boks-tekst">
                  {messages["allerede-registrert-boks-3-tekst"]}
                </Normaltekst>
                <a
                  href={DIALOG_URL}
                  className="allerede-registrert__knapp knapp"
                  onClick={this.handleClickDialog}
                  data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                  data-servicegruppe={servicegruppeOrIngenVerdi}
                  data-geografisktilknytning={geografiskTilknytning}
                  data-rettighetsgruppe={rettighetsgruppe}
                >
                  {messages["allerede-registrert-boks-3-knapp"]}
                </a>
              </div>
            </Column>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state: state,
});

export default connect(mapStateToProps)(injectIntl(AlleredeRegistrert));
