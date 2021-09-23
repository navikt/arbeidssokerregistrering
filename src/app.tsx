import * as React from "react";
import { Provider } from "react-redux";
import IntlProvider from "./Intl-provider";
import { getStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import HentInitialData from "./komponenter/initialdata/hent-initial-data";
import Routes from "./routes";
import { TimeoutModal } from "@navikt/fo-session-timeout-modal";
import { AUTENTISERINGSINFO_URL } from "./ducks/api";

const App = ({ basename }: { basename: string }) => (
  <Provider store={getStore()}>
    <IntlProvider>
      <HentInitialData>
        <TimeoutModal authUrl={AUTENTISERINGSINFO_URL} />
        <Router basename={basename}>
          <Routes />
        </Router>
      </HentInitialData>
    </IntlProvider>
  </Provider>
);

export default App;
