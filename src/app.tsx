import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import './decorator/decorator-mock';
import SjekkRegistreringstatus from './komponenter/oppfolgingsstatus/sjekk-registreringstatus';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import {
    basename,
} from './utils/konstanter';
import Routes from './routes';
import Modal from 'react-modal';

const store = getStore();

Modal.setAppElement('#root');

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <HentInitialData>
                        <SjekkRegistreringstatus>
                            <Router basename={basename}>
                                <Routes/>
                            </Router>
                        </SjekkRegistreringstatus>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
