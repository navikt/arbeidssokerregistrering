import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Normaltekst } from "nav-frontend-typografi";
import { lagDetaljeVisningUrl } from "../../../utils/url-utils";
import "./registrert-send-videre.less";

class RegistrertSendVidere extends React.Component {
  // NB: Tiden for animasjonen er 6000ms, ikke redirect før dette
  private readonly REDIRECT_AFTER = 11000;

  componentDidMount() {
    setTimeout(this.sendVidereTilDetaljer, this.REDIRECT_AFTER);
  }

  sendVidereTilDetaljer = () => {
    window.location.href = lagDetaljeVisningUrl();
  };

  render() {
    return (
      <div className="registrert-send-videre">
        <Normaltekst className="registrert-send-videre__tekst">
          <FormattedMessage id="duernaregistrert-manuell-normaltekst" />
        </Normaltekst>
        <a className="knapp knapp--hoved registrert-send-videre__lenke" href={lagDetaljeVisningUrl()}>
          <FormattedMessage id="duernaregistrert-manuell-lenke-videre" />
        </a>
      </div>
    );
  }
}

export default RegistrertSendVidere;
