import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { scrollToBanner } from "../../utils/utils";

import "./loader.less";

export const loaderTittelElement = (
  <>
    <Innholdstittel className="blokk-s">Registrering pågår</Innholdstittel>
    <Normaltekst>Vi setter opp tjenester til deg. Dette kan ta noen sekunder.</Normaltekst>
  </>
);

interface LoaderProps {
  tittelElement?: React.ReactNode;
}

export default class Loader extends React.Component<LoaderProps> {
  /*
        Har flyttet ut spinner komponent i nav-frontend-spinner
        TODO Ta i bruk det i bruk når PR'en er merget
    */

  componentDidMount() {
    scrollToBanner();
  }

  render() {
    return (
      <div className="loader">
        <div className="spinner spinner--xxl" aria-label="Laster innhold">
          <div />
          <div />
          <div />
          <div />
        </div>
        {this.props.tittelElement}
      </div>
    );
  }
}
