import * as React from 'react';
import * as moment from 'moment';
import 'moment/locale/nb';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import './decorator/decorator-mock';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import {
    basename,
} from './utils/konstanter';
import Routes from './routes';
import Modal from 'react-modal';
import ManuellRegistreringSjekk from './komponenter/manuell-registrering-sjekk';
import initialiserToppmeny from './utils/dekorator-utils';
import { erIFSS } from './utils/utils';
import Visitkort from './komponenter/visittkort';

const store = getStore();

moment.locale('nb');

Modal.setAppElement('#root');

class App extends React.Component {

    componentWillMount() {
        if (erIFSS()) {
            initialiserToppmeny();
        }
    }

    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <ManuellRegistreringSjekk>
                        <Visitkort />
                        <HentInitialData>
                            <Router basename={basename}>
                                <Routes/>
                            </Router>
                        </HentInitialData>
                    </ManuellRegistreringSjekk>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
