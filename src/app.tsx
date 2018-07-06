import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './decorator/decorator-mock';
import SjekkRegistreringstatus from './komponenter/oppfolgingsstatus/sjekk-registreringstatus';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import { basename } from './utils/konstanter';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Banner from './komponenter/banner/banner';
import Sideanimasjon from './komponenter/animasjon/sideanimasjon';

const store = getStore();

class App extends React.Component {  // tslint:disable-line:no-any

    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <HentInitialData>
                        <SjekkRegistreringstatus>
                            <Router basename={basename}>
                                <>
                                    <Route path="/" component={Banner}/>
                                    <Route path={'/:url'} component={ProgressBarContainer}/>
                                    <Sideanimasjon/>
                                </>
                            </Router>
                        </SjekkRegistreringstatus>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
