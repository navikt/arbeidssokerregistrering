import * as React from "react";
import "moment/locale/nb";
import { Provider } from "react-redux";
import IntlProvider from "./Intl-provider";
import { getStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import HentInitialData from "./komponenter/initialdata/hent-initial-data";
import Routes from "./routes";
import { TimeoutModal } from "@navikt/fo-session-timeout-modal";
import KontaktMegOppholdstillatelse from "./komponenter/oppholdstillatelse/KontaktMegController";

class App extends React.Component {
  render() {
    return (
      <Provider store={getStore()}>
        <IntlProvider>
          <HentInitialData>
            {/* <TimeoutModal /> */}
            <KontaktMegOppholdstillatelse />
            {/* <Router>
                            <Routes />
                        </Router> */}
          </HentInitialData>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
