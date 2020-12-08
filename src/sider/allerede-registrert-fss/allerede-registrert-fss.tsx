import * as React from "react";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import BannerFss from "../../komponenter/banner-fss/banner-fss";
import aktivitetsplanIkon from "./aktivitetsplan-ikon.svg";
import { lagAktivitetsplanUrl } from "../../utils/url-utils";
import "./allerede-registrert-fss.less";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";

class AlleredeRegistrertFss extends React.Component<InjectedIntlProps> {
  render() {
    return (
      <>
        <BannerFss tekstId="banner-fss-bruker-allerede-registrert" />
        <div className="allerede-registrert-fss">
          <div className="allerede-registrert-fss__dialog">
            <img src={aktivitetsplanIkon} alt="Aktivitetsplan ikon" className="allerede-registrert-fss__illustrasjon" />
            <div>
              <Systemtittel>
                <FormattedMessage id="allerede-registrert-fss-tittel" />
              </Systemtittel>
              <div className="allerede-registrert-fss__melding">
                <Normaltekst>
                  <FormattedMessage id="allerede-registrert-fss-melding" />
                </Normaltekst>
              </div>
              <a className="lenke allerede-registrert-fss__lenke" href={lagAktivitetsplanUrl()}>
                <FormattedMessage id="allerede-registrert-fss-lenke" />
              </a>
              <span className="chevron--hoyre" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default injectIntl(AlleredeRegistrertFss);
