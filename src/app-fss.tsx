import * as React from "react";
import { Provider } from "react-redux";
import IntlProvider from "./Intl-provider";
import { getStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import HentInitialData from "./komponenter/initialdata/hent-initial-data";
import Routes from "./routes";
import ManuellRegistreringSjekk from "./komponenter/manuell-registrering-sjekk";
import { initToppmeny } from "./utils/dekorator-utils";
import Visitkort from "./komponenter/visittkort/visittkort";
import {
  clearSession,
  hasSessionExpired,
  initSessionKontekst,
  startSetExpirationOnUnloadListener,
  clearSessionExpiration,
} from "./utils/fss-utils";

class AppFss extends React.Component {
  componentDidMount() {
    if (hasSessionExpired()) {
      clearSession();
    } else {
      clearSessionExpiration();
    }

    startSetExpirationOnUnloadListener();

    initSessionKontekst();
    initToppmeny();
  }

  render() {
    return (
      <Provider store={getStore()}>
        <IntlProvider>
          <ManuellRegistreringSjekk>
            <Visitkort />
            <HentInitialData>
              <Router>
                <Routes />
              </Router>
            </HentInitialData>
          </ManuellRegistreringSjekk>
        </IntlProvider>
      </Provider>
    );
  }
}

export default AppFss;
