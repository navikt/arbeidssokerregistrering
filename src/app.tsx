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
import { TimeoutModal } from '@navikt/fo-session-timeout-modal';

class App extends React.Component {

    render() {
        return (
            <Provider store={getStore()}>
                <IntlProvider>
                    <HentInitialData>
                        <TimeoutModal/>
                        <Router>
                            <Routes/>
                        </Router>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
