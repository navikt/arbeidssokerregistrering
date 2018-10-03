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
import {Data as FeatureTogglesData, hentFeatureToggles, selectFeatureToggles } from '../../ducks/feature-toggles';
import { VEILARBSTEPUP } from '../../ducks/api';
import FeilmeldingGenerell from '../feilmelding/feilmelding-generell';

interface StateProps {
    brukersNavn: BrukersNavnState;
    autentiseringsinfo: AuthState;
    registreringstatus: RegistreringstatusState;
    featureToggles: FeatureTogglesData;
}

interface DispatchProps {
    hentBrukersNavn: () => Promise<void | {}>;
    hentAutentiseringsInfo: () => Promise<void | {}>;
    hentRegistreringStatus: () => void;
    hentFeatureToggles: () => Promise<void | {}>;
}

type Props = StateProps & DispatchProps;

export class HentInitialData extends React.Component<Props> {
    componentWillMount() {

        this.props.hentFeatureToggles().then(() => {
            this.props.hentAutentiseringsInfo().then((res) => {
                if ((res as AuthData).nivaOidc === 4) {
                    this.props.hentRegistreringStatus();
                    this.props.hentBrukersNavn();
                }
            });
        });
    }

    render() {
        const { children, registreringstatus, autentiseringsinfo, brukersNavn } = this.props;
        const { niva, nivaOidc } = autentiseringsinfo.data;

        if (autentiseringsinfo.status === STATUS.OK) {
            if (niva === 4 && nivaOidc !== 4) {
                // er innlogget med OpenAM nivå 4, men mangler innlogging med AzureAD på nivå4.
                window.location.href = VEILARBSTEPUP;
            } else if (niva !== 4 || nivaOidc !== 4) {
                // bruker må være innlogget med både oidc og openam på nivå 4 til appen får app-spesifikt domene.
                return <StepUp/>;
            }
        }

        return (
            <Innholdslaster
                feilmeldingKomponent={<FeilmeldingGenerell />}
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

const mapStateToProps = (state) => ({
    autentiseringsinfo: selectAutentiseringsinfo(state),
    brukersNavn:  selectBrukersNavn(state),
    registreringstatus: selectRegistreringstatus(state),
    featureToggles: selectFeatureToggles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentBrukersNavn: () => dispatch(hentBrukersNavn()),
    hentAutentiseringsInfo:  () => dispatch(hentAutentiseringsInfo()),
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
    hentFeatureToggles: () => dispatch(hentFeatureToggles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);