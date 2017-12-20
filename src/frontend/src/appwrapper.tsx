import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
    Redirect
} from 'react-router-dom';
import { hentRegistreringStatus } from './ducks/hentRegistreringStatus';
import Innholdslaster from './innholdslaster/innholdslaster';
import { RegStatusState } from './ducks/hentRegistreringStatus';
import { AppState } from './reducer';

export const sblArbeid = '/sbl/arbeid';

interface StateProps {
    registreringStatus: RegStatusState;
}

interface DispatchProps {
    hentRegistreringStatus: (fnr: string) => void;
}

type AppWrapperProps = StateProps & DispatchProps;

class AppWrapper extends React.Component<AppWrapperProps> {
    componentWillMount() {
        this.props.hentRegistreringStatus('123');
    }

    render() {
        const { registreringStatus } = this.props;
        const { data } = registreringStatus;
        if (data.erUnderOppfolging) {
            return <Redirect to={sblArbeid}/>;
        } else {
            return (
                <Innholdslaster avhengigheter={[registreringStatus]} className="innholdslaster">
                    {this.props.children}
                </Innholdslaster>
            );
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    registreringStatus: state.registreringStatus
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentRegistreringStatus: (fnr) => {
        dispatch(hentRegistreringStatus(fnr));
        return null;
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);