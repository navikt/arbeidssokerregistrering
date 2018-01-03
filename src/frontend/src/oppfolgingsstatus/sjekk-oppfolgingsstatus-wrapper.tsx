import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentRegistreringStatus } from '../ducks/hentRegistreringStatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { RegStatusState } from '../ducks/hentRegistreringStatus';
import { AppState } from '../reducer';
import { sblUrl } from '../oppsummering/sbl-registrering';
import OppfolgingsstatusFeilmelding from './oppfolgingsstatus-feilmelding';
import { STATUS } from '../ducks/utils';

export const veienTilArbeid = '/veientilarbeid';

interface StateProps {
    registreringStatus: RegStatusState;
}

interface DispatchProps {
    hentRegistreringStatus: () => void;
}

type AppWrapperProps = StateProps & DispatchProps;

class SjekkOppfolgingsstatusWrapper extends React.Component<AppWrapperProps> {
    componentWillMount() {
        this.props.hentRegistreringStatus();
    }

    render() {
        const {registreringStatus} = this.props;

        const innholdslaster = (
            <Innholdslaster
                avhengigheter={[registreringStatus]}
                className="innholdslaster"
                feilmeldingKomponent={<OppfolgingsstatusFeilmelding/>}
                storrelse="XXL"
            >
                {this.props.children}
            </Innholdslaster>);

        const {data} = registreringStatus;
        if (registreringStatus.status === STATUS.NOT_STARTED) {
            return innholdslaster;
        } else if (data.underOppfolging) {
            return document.location.href = veienTilArbeid;
        } else if (!data.oppfyllerKrav) {
            return document.location.href = sblUrl;

        } else {
            return innholdslaster;
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    registreringStatus: state.registreringStatus
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SjekkOppfolgingsstatusWrapper);