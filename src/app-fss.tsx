import * as React from 'react';
import 'moment/locale/nb';
import { Provider } from 'react-redux';
import { getStore } from './store';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import Routes from './routes';
import ManuellRegistreringSjekk from './komponenter/manuell-registrering-sjekk';
import { initToppmeny } from './utils/dekorator-utils';
import Visitkort from './komponenter/visittkort/visittkort';
import {
    clearSession,
    hasSessionExpired,
    initSessionKontekst,
    startSetExpirationOnUnloadListener,
    startBrukerFnrEndretListener,
    clearSessionExpiration
} from './utils/fss-utils';

class AppFss extends React.Component {

    componentWillMount() {
        if (hasSessionExpired()) {
            clearSession();
        } else {
            clearSessionExpiration();
        }

        startBrukerFnrEndretListener();
        startSetExpirationOnUnloadListener();

        initSessionKontekst();
        initToppmeny();
    }

    render() {
        return (
            <Provider store={getStore()}>
                <ManuellRegistreringSjekk>
                    <Visitkort />
                    <HentInitialData>
                        <Router>
                            <Routes/>
                        </Router>
                    </HentInitialData>
                </ManuellRegistreringSjekk>
            </Provider>
        );
    }
}

export default AppFss;
