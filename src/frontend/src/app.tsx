import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import RegistrerDeg from './registrer/registrerdeg';
import StartRegistrering from './start/start';
import RegVelykket from './regvelykket/regvelykket';
import Avbryt from './avbryt/avbryt';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SkjemaPanel from './skjema/skjema';
import Oppsummering from './oppsummering/oppsummering';
import SblRegistrering from './oppsummering/sbl-registrering';
import './decorator/decorator-mock';

const store = getStore();
export const basename = '/arbeidssokerregistrering';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <Router basename={basename}>
                        <div className="arbsokreg_app">
                            <Route path="/start" component={StartRegistrering}/>
                            <Route path="/registrer" component={RegistrerDeg}/>
                            <Route path="/skjema/:id" component={SkjemaPanel}/>
                            <Route path="/oppsummering" component={Oppsummering}/>
                            <Route path="/sblregistrering" component={SblRegistrering}/>
                            <Route path="/regvelykket" component={RegVelykket}/>
                            <Route path="/avbryt" component={Avbryt}/>
                            <Route path="/fullfor" component={Avbryt}/>
                        </div>
                    </Router>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
