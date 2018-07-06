import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import StartRegistrering from './sider/start/start';
import Avbryt from './sider/avbryt/avbryt';
import Fullfor from './sider/fullfor/fullfor';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Oppsummering from './sider/oppsummering/oppsummering';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import './decorator/decorator-mock';
import Skjema from './sider/skjema/skjema-container';
import SjekkRegistreringstatus from './komponenter/oppfolgingsstatus/sjekk-registreringstatus';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import {
    basename, START_PATH, OPPSUMMERING_PATH, SKJEMA_PATH, SBLREG_PATH,
    AVBRYT_PATH, FULLFOR_PATH, DUERNAREGISTRERT_PATH,
} from './utils/konstanter';
import DuErNaRegistrert from './sider/registrert/registrert';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Banner from './komponenter/banner/banner';

const store = getStore();
const paths = [START_PATH, SKJEMA_PATH, OPPSUMMERING_PATH, SBLREG_PATH, AVBRYT_PATH, FULLFOR_PATH, DUERNAREGISTRERT_PATH];

class App extends React.Component {

    componentDidMount() {
    }

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
                                    <Switch>
                                        <Route path={START_PATH} component={StartRegistrering}/>
                                        <Route path={`${SKJEMA_PATH}/:id`} component={Skjema}/>
                                        <Route path={OPPSUMMERING_PATH} component={Oppsummering}/>
                                        <Route path={SBLREG_PATH} component={SblRegistrering}/>
                                        <Route path={AVBRYT_PATH} component={Avbryt}/>
                                        <Route path={FULLFOR_PATH} component={Fullfor}/>
                                        <Route path={DUERNAREGISTRERT_PATH} component={DuErNaRegistrert}/>
                                        <Redirect exact={true} from="/" to={START_PATH}/>
                                    </Switch>
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
