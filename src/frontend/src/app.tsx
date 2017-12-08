import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import RegistrerDeg from './registrerdeg';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Skjema from './skjema/skjema';
import Oppsummering from './oppsummering/oppsummering';
import SblRegistrering from "./oppsummering/sbl-registrering";

const store = getStore();
export const basename = '/arbeidsokerregistrering';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <Router basename={basename}>
                        <div className="body__wrapper">
                            <Route path="/registrer" component={RegistrerDeg}/>
                            <Route path="/skjema/:id" component={Skjema}/>
                            <Route path="/oppsummering" component={Oppsummering}/>
                            <Route path="/sblregistrering" component={SblRegistrering}/>
                        </div>
                    </Router>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
