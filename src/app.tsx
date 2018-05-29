import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import StartRegistrering from './sider/start/start';
import DinSituasjon from './sider/dinsituasjon/dinsituasjon';
import Avbryt from './sider/avbryt/avbryt';
import Fullfor from './sider/fullfor/fullfor';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Oppsummering from './sider/oppsummering/oppsummering';
import SblRegistrering from './sider/oppsummering/sbl-registrering';
import './decorator/decorator-mock';
import Skjema from './sider/skjema/skjema-container';
import SjekkRegistreringstatus from './komponenter/oppfolgingsstatus/sjekk-registreringstatus';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import {
    basename, START_PATH, OPPSUMMERING_PATH, SKJEMA_PATH, SBLREG_PATH,
    AVBRYT_PATH, FULLFOR_PATH, DINSITUASJON_PATH, UENIG_PATH, DUERNAREGISTRERT_PATH, FEIL_PATH
} from './utils/konstanter';
import UenigSelvgaende from './sider/oppsummering/uenig-selvgaende';
import DuErNaRegistrert from './sider/duernaregistrert/duernaregistrert';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Banner from './komponenter/banner/banner';
import Feilhandtering from './sider/fullfor/feilhandtering/feilmelding-spesiell';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <main id="maincontent" role="main" tabIndex={-1} className="arbsokreg_app">
                <Provider store={store}>
                    <IntlProvider>
                        <HentInitialData>
                            <SjekkRegistreringstatus>
                                <Router basename={basename}>
                                    <div>
                                        <Route path="/" component={Banner}/>
                                        <Route path={'/:url'} component={ProgressBarContainer}/>
                                        <Switch>
                                            <Route path={'feil'} component={Feilhandtering}/>
                                            <Route path={START_PATH} component={StartRegistrering}/>
                                            <Route path={DINSITUASJON_PATH} component={DinSituasjon}/>
                                            <Route path={`${SKJEMA_PATH}/:id`} component={Skjema}/>
                                            <Route path={OPPSUMMERING_PATH} component={Oppsummering}/>
                                            <Route path={SBLREG_PATH} component={SblRegistrering}/>
                                            <Route path={AVBRYT_PATH} component={Avbryt} />
                                            <Route path={FULLFOR_PATH} component={Fullfor}/>
                                            <Route path={DUERNAREGISTRERT_PATH} component={DuErNaRegistrert} />
                                            <Route path={UENIG_PATH} component={UenigSelvgaende} />
                                            <Route path={FEIL_PATH} component={Feilhandtering} />
                                            <Redirect exact={true} from="/" to={START_PATH}/>
                                        </Switch>
                                    </div>
                                </Router>
                            </SjekkRegistreringstatus>
                        </HentInitialData>
                    </IntlProvider>
                </Provider>
            </main>
        );
    }
}

export default App;
