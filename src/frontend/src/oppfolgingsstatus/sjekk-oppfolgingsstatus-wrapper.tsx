import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentRegistreringStatus } from '../ducks/hentRegistreringStatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { RegStatusState } from '../ducks/hentRegistreringStatus';
import RegistreringStatus from '../ducks/registrering-status-modell';
import { AppState } from '../reducer';
import { sblUrl } from '../oppsummering/sbl-registrering';
import OppfolgingsstatusFeilmelding from './oppfolgingsstatus-feilmelding';

export const veienTilArbeid = '/veientilarbeid';

interface StateProps {
    registreringStatus: RegStatusState;
}

interface DispatchProps {
    hentRegistreringStatus: () => void;
}

type AppWrapperProps = StateProps & DispatchProps;

function redirectOrRenderChildren(data: RegistreringStatus, children: React.ReactNode | React.ReactChild) {
    if (data.underOppfolging) {
        return document.location.href = veienTilArbeid;
    } else if (!data.oppfyllerKrav) {
        return document.location.href = sblUrl;
    } else {
        return children;
    }
}

class SjekkOppfolgingsstatusWrapper extends React.Component<AppWrapperProps> {
    componentWillMount() {
        this.props.hentRegistreringStatus();
    }

    render() {
        const {registreringStatus, children} = this.props;
        return (
            <Innholdslaster
                avhengigheter={[registreringStatus]}
                className="innholdslaster"
                feilmeldingKomponent={<OppfolgingsstatusFeilmelding/>}
                storrelse="XXL"
            >
                {() => redirectOrRenderChildren(registreringStatus.data, children)}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    registreringStatus: state.registreringStatus
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SjekkOppfolgingsstatusWrapper);