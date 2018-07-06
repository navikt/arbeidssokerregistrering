import * as React from 'react';
import {
    AVBRYT_PATH,
    DUERNAREGISTRERT_PATH,
    FULLFOR_PATH,
    OPPSUMMERING_PATH,
    SBLREG_PATH,
    SKJEMA_PATH,
    START_PATH
} from '../../utils/konstanter';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import Avbryt from '../../sider/avbryt/avbryt';
import DuErNaRegistrert from '../../sider/registrert/registrert';
import StartRegistrering from '../../sider/start/start';
import Skjema from '../../sider/skjema/skjema-container';
import Fullfor from '../../sider/fullfor/fullfor';
import Oppsummering from '../../sider/oppsummering/oppsummering';
import SblRegistrering from '../../sider/sbl-registrering/sbl-registrering';

const paths = [
    START_PATH,
    SKJEMA_PATH,
    OPPSUMMERING_PATH,
    FULLFOR_PATH,
    DUERNAREGISTRERT_PATH
];

interface State {
    forover: boolean;
}

type SideanimasjonProps = RouteComponentProps<any>; // tslint:disable-line:no-any

class Sideanimasjon extends React.Component<SideanimasjonProps, State> {

    constructor(props: SideanimasjonProps) {
        super(props);
        this.state = {
            forover: true
        };
    }

    componentWillReceiveProps(nextProps: SideanimasjonProps) {
        if (nextProps.location !== this.props.location) {
            const currentPath = this.trimPath(this.props.location.pathname);
            const nextPath = this.trimPath(nextProps.location.pathname);

            if (currentPath === SKJEMA_PATH && nextPath === SKJEMA_PATH) {
                this.setState({
                    forover: this.getIdFromPath(this.props.location.pathname)
                    < this.getIdFromPath(nextProps.location.pathname)
                });
            } else {
                this.setState({forover: paths.indexOf(currentPath) < paths.indexOf(nextPath)});
            }
        }
    }

    trimPath(path: string): string {
        if (path.startsWith(SKJEMA_PATH)) {
            return SKJEMA_PATH;
        } else {
            return path;
        }
    }

    getIdFromPath(path: string): number {
        return Number(path.split('/')[2]);
    }

    render() {
        return (
            <div className={!this.state.forover ? 'limit bakover' : 'limit forover'}>
                <Switch location={this.props.history.location}>
                    <Route path={START_PATH} component={StartRegistrering}/>
                    <Route path={`${SKJEMA_PATH}/:id`} component={Skjema}/>
                    <Route path={OPPSUMMERING_PATH} component={Oppsummering}/>
                    <Route path={SBLREG_PATH} component={SblRegistrering}/>
                    <Route path={AVBRYT_PATH} component={Avbryt}/>
                    <Route path={FULLFOR_PATH} component={Fullfor}/>
                    <Route path={DUERNAREGISTRERT_PATH} component={DuErNaRegistrert}/>
                    <Redirect exact={true} from="/" to={START_PATH}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Sideanimasjon);
