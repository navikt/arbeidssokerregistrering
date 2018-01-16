import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentRegistreringStatus } from '../ducks/hentRegistreringStatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { RegStatusState } from '../ducks/hentRegistreringStatus';
import RegistreringStatus from '../ducks/registrering-status-modell';
import { AppState } from '../reducer';
import OppfolgingsstatusFeilmelding from './oppfolgingsstatus-feilmelding';
import { sblarbeidUrlSelector, veientilarbeidUrlSelector, veilarboppfolgingproxyUrlSelector } from '../ducks/api';

interface StateProps {
    registreringStatus: RegStatusState;
    veilarboppfolgingproxyUrl: string;
    sblarbeidUrl: string;
    veientilarbeidUrl: string;
}

interface DispatchProps {
    hentRegistrering: (baseUrl: string) => void;
}

type AppWrapperProps = StateProps & DispatchProps;

function redirectOrRenderChildren(data: RegistreringStatus,
                                  children: React.ReactNode | React.ReactChild,
                                  sblarbeidUrl: string,
                                  veientilarbeidUrl: string  ) {
    if (data.underOppfolging) {
        document.location.href = veientilarbeidUrl;
        return null;
    } else if (!data.oppfyllerKrav) {
        document.location.href = sblarbeidUrl;
        return null;
    } else {
        return children;
    }
}

class SjekkOppfolgingsstatusWrapper extends React.Component<AppWrapperProps> {
    componentWillMount() {
        const { veilarboppfolgingproxyUrl, hentRegistrering } = this.props;
        hentRegistrering(veilarboppfolgingproxyUrl);
    }

    render() {
        const {registreringStatus, children, sblarbeidUrl, veientilarbeidUrl} = this.props;
        return (
            <Innholdslaster
                avhengigheter={[registreringStatus]}
                feilmeldingKomponent={<OppfolgingsstatusFeilmelding/>}
                storrelse="XXL"
            >
                {() => redirectOrRenderChildren(registreringStatus.data, children, sblarbeidUrl, veientilarbeidUrl)}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        registreringStatus: state.registreringStatus,
        sblarbeidUrl: sblarbeidUrlSelector(state),
        veientilarbeidUrl: veientilarbeidUrlSelector(state),
        veilarboppfolgingproxyUrl: veilarboppfolgingproxyUrlSelector(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentRegistrering: (baseUrl: string) => dispatch(hentRegistreringStatus(baseUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SjekkOppfolgingsstatusWrapper);