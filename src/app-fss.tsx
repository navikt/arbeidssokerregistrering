import * as React from 'react';
import 'moment/locale/nb';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import { getStore } from './store';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import './decorator/decorator-mock';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import Routes from './routes';
import ManuellRegistreringSjekk from './komponenter/manuell-registrering-sjekk';
import { initialiserToppmeny } from './utils/dekorator-utils';
import Visitkort from './komponenter/visittkort';
import { initSessionKontekst, setExpirationOnWindowUnload } from './utils/fss-utils';

class AppFss extends React.Component {

    componentWillMount() {
        initSessionKontekst();
        initialiserToppmeny();
        setExpirationOnWindowUnload();
    }

    render() {
        return (
            <Provider store={getStore()}>
                <IntlProvider>
                    <ManuellRegistreringSjekk>
                        <Visitkort />
                        <HentInitialData>
                            <Router>
                                <Routes/>
                            </Router>
                        </HentInitialData>
                    </ManuellRegistreringSjekk>
                </IntlProvider>
            </Provider>
        );
    }
}

export default AppFss;
