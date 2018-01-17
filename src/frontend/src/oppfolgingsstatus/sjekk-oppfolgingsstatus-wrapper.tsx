import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentRegistreringStatus } from '../ducks/hentRegistreringStatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { RegStatusState } from '../ducks/hentRegistreringStatus';
import RegistreringStatus from '../ducks/registrering-status-modell';
import { AppState } from '../reducer';
import OppfolgingsstatusFeilmelding from './oppfolgingsstatus-feilmelding';
import { veientilarbeidUrlSelector, veilarboppfolgingproxyUrlSelector } from '../ducks/api';
import SblRegistrering from '../oppsummering/sbl-registrering';

interface StateProps {
    registreringStatus: RegStatusState;
    veilarboppfolgingproxyUrl: string;
    veientilarbeidUrl: string;
}

interface DispatchProps {
    hentRegistrering: (baseUrl: string) => void;
}

type AppWrapperProps = StateProps & DispatchProps;

function redirectOrRenderChildren(data: RegistreringStatus,
                                  children: React.ReactNode | React.ReactChild,
                                  veientilarbeidUrl: string) {
    if (data.underOppfolging) {
        document.location.href = veientilarbeidUrl;
        return null;
    } else if (!data.oppfyllerKrav) {
        return <SblRegistrering/>;
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
        const { registreringStatus, children, veientilarbeidUrl} = this.props;
        return (
            <Innholdslaster
                avhengigheter={[registreringStatus]}
                feilmeldingKomponent={<OppfolgingsstatusFeilmelding/>}
                storrelse="XXL"
            >
                {() => redirectOrRenderChildren(
                    registreringStatus.data,
                    children,
                    veientilarbeidUrl
                )}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        registreringStatus: state.registreringStatus,
        veientilarbeidUrl: veientilarbeidUrlSelector(state),
        veilarboppfolgingproxyUrl: veilarboppfolgingproxyUrlSelector(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentRegistrering: (baseUrl: string) => dispatch(hentRegistreringStatus(baseUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SjekkOppfolgingsstatusWrapper);