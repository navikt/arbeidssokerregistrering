import * as React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import "./videotekst-accordion.less";

interface EgenState {
  apen: boolean;
}

class VideotekstAccordion extends React.Component<Record<string, unknown>, EgenState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { apen: false };
  }
  render() {
    return (
      <section className="videotekst-accordion">
        {this.state.apen ? (
          <div className="informasjon-modal__innhold">
            <FormattedHTMLMessage id="registrering-arbeidssoker.informasjon-modal.innhold" />
          </div>
        ) : null}

        <a
          href="/"
          className="videotekst-accordion__lenke"
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              apen: !this.state.apen,
            });
          }}
        >
          <FormattedMessage
            id={`registrering-arbeidssoker.informasjon-modal.undertittel${this.state.apen ? ".skjul" : ""}`}
          />
          {this.state.apen ? <OppChevron /> : <NedChevron />}
        </a>
      </section>
    );
  }
}

export default VideotekstAccordion;
