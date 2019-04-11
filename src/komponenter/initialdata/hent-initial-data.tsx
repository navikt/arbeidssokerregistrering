import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import { hentBrukersNavn, selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import {
    Data as AuthData,
    hentAutentiseringsInfo,
    selectAutentiseringsinfo,
    State as AuthState
} from '../../ducks/autentiseringsinfo';
import {
    hentRegistreringStatus,
    selectRegistreringstatus,
    State as RegistreringstatusState
} from '../../ducks/registreringstatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import StepUp from './stepup';
import { STATUS } from '../../ducks/api-utils';
import Loader from '../loader/loader';
import { VEILARBSTEPUP } from '../../ducks/api';
import FeilmeldingGenerell from '../feilmelding/feilmelding-generell';
import { hentFeatureToggles } from '../../ducks/feature-toggles';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface StateProps {
    brukersNavn: BrukersNavnState;
    autentiseringsinfo: AuthState;
    registreringstatus: RegistreringstatusState;
}

interface DispatchProps {
    hentBrukersNavn: () => Promise<void | {}>;
    hentAutentiseringsInfo: () => Promise<void | {}>;
    hentRegistreringStatus: () => void;
    hentFeatureToggle: () => Promise<void | {}>;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export class HentInitialData extends React.Component<Props> {
    componentWillMount() {

        this.props.hentFeatureToggle().then(() => {

            this.props.hentAutentiseringsInfo().then((res) => {
                if ((res as AuthData).nivaOidc === 4) {
                    this.props.hentRegistreringStatus();
                    this.props.hentBrukersNavn();
                }
            });

        });

    }

    render() {
        const {children, registreringstatus, autentiseringsinfo, brukersNavn} = this.props;
        const {niva, nivaOidc} = autentiseringsinfo.data;

        if (autentiseringsinfo.status === STATUS.OK) {
            if (niva === 4 && nivaOidc !== 4) {
                // Bruker er allerede innlogget og har OpenAM-token på nivå 4, men mangler Oidc-token med nivå 4.
                // Redirecter til Veilarbstepup som automatisk gir bruker Oidc-token på nivå 4.
                window.location.href = VEILARBSTEPUP;
            } else if (nivaOidc !== 4) {
                // Bruker mangler Oidc-token på nivå 4.
                // Sender derfor bruker til step-up-side med forklaring og Logg-inn-knapp.
                return (<StepUp intl={this.props.intl} />);
            }
        }

        return (
            <Innholdslaster
                feilmeldingKomponent={<FeilmeldingGenerell/>}
                avhengigheter={[
                    registreringstatus,
                    brukersNavn,
                    autentiseringsinfo
                ]}
                storrelse="XXL"
                loaderKomponent={<Loader/>}
            >
                {children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    autentiseringsinfo: selectAutentiseringsinfo(state),
    brukersNavn: selectBrukersNavn(state),
    registreringstatus: selectRegistreringstatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentBrukersNavn: () => dispatch(hentBrukersNavn()),
    hentAutentiseringsInfo: () => dispatch(hentAutentiseringsInfo()),
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
    hentFeatureToggle: () => dispatch(hentFeatureToggles())
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HentInitialData));