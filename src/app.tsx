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
import HerokuappEndreMockRegistreringLoep from
    './mocks/HerokuappEndreMockRegistreringLoep/herokuapp-endre-mock-registrering-loep';

const store = getStore();

moment.locale('nb');

Modal.setAppElement('#root');

class App extends React.Component {

    render() {
        const BrukesIHerokuappEndreRegistreringTypeMock =
            process.env.REACT_APP_MOCK_ENDRE_REG_LOP
            ? <HerokuappEndreMockRegistreringLoep/>
            : null;
        return (
            <Provider store={store}>
                <IntlProvider>
                    <HentInitialData>
                        {BrukesIHerokuappEndreRegistreringTypeMock}
                        <Router basename={basename}>
                            <Routes/>
                        </Router>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
