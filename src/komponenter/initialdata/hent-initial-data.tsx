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
    Data as RegistreringstatusData,
    hentRegistreringStatus,
    RegistreringType,
    selectRegistreringstatus,
    State as RegistreringstatusState
} from '../../ducks/registreringstatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import StepUp from './stepup';
import { FetchState, STATUS } from '../../ducks/api-utils';
import Loader from '../loader/loader';
import { VEILARBSTEPUP } from '../../ducks/api';
import { hentSykmeldtInfo, selectSykmeldtInfo, State as SykmeldtInfoState } from '../../ducks/sykmeldt-info';
import FeilmeldingGenerell from '../feilmelding/feilmelding-generell';
import { hentFeatureToggles } from '../../ducks/feature-toggles';

interface HentInitialDataState {
    erSykmeldt: boolean;
}

interface StateProps {
    brukersNavn: BrukersNavnState;
    autentiseringsinfo: AuthState;
    registreringstatus: RegistreringstatusState;
    sykmeldtInfo: SykmeldtInfoState;
}

interface DispatchProps {
    hentBrukersNavn: () => Promise<void | {}>;
    hentAutentiseringsInfo: () => Promise<void | {}>;
    hentRegistreringStatus: () => Promise<void | RegistreringstatusData>;
    hentFeatureToggle: () => Promise<void | {}>;
    hentSykmeldtInfo: () => Promise<void | {}>;
}

type Props = StateProps & DispatchProps;

export class HentInitialData extends React.Component<Props, HentInitialDataState> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            erSykmeldt: false
        };
    }

    handleRegistreringStatusHentet = (registreringStatusData: RegistreringstatusData) => {

        const erSykmeldt = registreringStatusData &&
            registreringStatusData.registreringType === RegistreringType.SYKMELDT_REGISTRERING;

        this.setState({ erSykmeldt });

        if (erSykmeldt) {
            this.props.hentSykmeldtInfo();
        }

    }

    componentWillMount() {

        this.props.hentFeatureToggle().then(() => {

            this.props.hentAutentiseringsInfo().then(res => {
                if ((res as AuthData).nivaOidc === 4) {
                    this.props.hentRegistreringStatus().then(this.handleRegistreringStatusHentet);
                    this.props.hentBrukersNavn();
                }
            });

        });

    }

    render() {
        const {children, registreringstatus, autentiseringsinfo, brukersNavn, sykmeldtInfo} = this.props;
        const {niva, nivaOidc} = autentiseringsinfo.data;

        if (autentiseringsinfo.status === STATUS.OK) {
            if (niva === 4 && nivaOidc !== 4) {
                // Bruker er allerede innlogget og har OpenAM-token på nivå 4, men mangler Oidc-token med nivå 4.
                // Redirecter til Veilarbstepup som automatisk gir bruker Oidc-token på nivå 4.
                window.location.href = VEILARBSTEPUP;
            } else if (niva !== 4 || nivaOidc !== 4) {
                // Bruker mangler enten OpenAm- eller Oidc-token på nivå 4.
                // Sender derfor bruker til step-up-side med forklaring og Logg-inn-knapp.
                return <StepUp/>;
            }
        }

        const avhengigheter: FetchState[] = [registreringstatus, autentiseringsinfo, brukersNavn];

        if (this.state.erSykmeldt) {
            avhengigheter.push(sykmeldtInfo);
        }

        return (
            <Innholdslaster
                feilmeldingKomponent={<FeilmeldingGenerell/>}
                avhengigheter={avhengigheter}
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
    brukersNavn: selectBrukersNavn(state),
    registreringstatus: selectRegistreringstatus(state),
    sykmeldtInfo: selectSykmeldtInfo(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentBrukersNavn: () => dispatch(hentBrukersNavn()),
    hentAutentiseringsInfo: () => dispatch(hentAutentiseringsInfo()),
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
    hentFeatureToggle: () => dispatch(hentFeatureToggles()),
    hentSykmeldtInfo: () => dispatch(hentSykmeldtInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);