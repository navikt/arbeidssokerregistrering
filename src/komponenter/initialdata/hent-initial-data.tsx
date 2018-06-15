import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../reducer';
import {
    hentInnloggingsInfo,
    selectInnloggingsinfo,
    State as InnloggingsinfoState } from '../../ducks/innloggingsinfo';
import {
    hentBrukerInfo,
    selectBrukerInfo,
    State as BrukerinfoState,
} from '../../ducks/brukerinfo';
import { hentAutentiseringsInfo,
    State as AuthState,
    Data as AuthData } from '../../ducks/autentiseringsinfo';
import {
    hentRegistreringStatus,
    selectRegistreringstatus,
    State as RegistreringstatusState } from '../../ducks/registreringstatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from './feilmelding';
import StepUp from './stepup';
import { STATUS } from '../../ducks/api-utils';
import Loader from '../loader/loader';
import { hentFeatureToggles, selectFeatureToggles, Data as FeatureTogglesData } from '../../ducks/feature-toggles';
import { selectAutentiseringsinfo } from '../../ducks/autentiseringsinfo';
import { VEILARBSTEPUP } from '../../ducks/api';

interface StateProps {
    innloggingsinfo: InnloggingsinfoState;
    autentiseringsinfo: AuthState;
    registreringstatus: RegistreringstatusState;
    brukerinfo: BrukerinfoState;
    featureToggles: FeatureTogglesData;
}

interface DispatchProps {
    hentInnloggingsInfo: () => Promise<void | {}>;
    hentAutentiseringsInfo: () => Promise<void | {}>;
    hentBrukerInfo: () => void;
    hentRegistreringStatus: (featureToggles: FeatureTogglesData) => void;
    hentFeatureToggles: () => Promise<void | {}>;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export class HentInitialData extends React.Component<Props> {
    componentWillMount() {

        this.props.hentFeatureToggles().then(() => {
            this.props.hentBrukerInfo();
            this.props.hentInnloggingsInfo();
            this.props.hentAutentiseringsInfo().then((res) => {
                if ((res as AuthData).niva === 4) {
                    this.props.hentRegistreringStatus(this.props.featureToggles);
                }
            });
        });
    }

    render() {
        const { children, registreringstatus, autentiseringsinfo, innloggingsinfo, intl, brukerinfo } = this.props;
        const { niva } = autentiseringsinfo.data;
        const { harGyldigOidcToken } = autentiseringsinfo.data;

        if (autentiseringsinfo.status === STATUS.OK) {
            if (niva !== 4) {
                return <StepUp intl={intl}/>;
            } else if (!harGyldigOidcToken) {
                // er innlogget med OpenAM nivå 4, men mangler innlogging med AzureAD.
                window.location.href = VEILARBSTEPUP;
            }
        }

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[
                    registreringstatus,
                    innloggingsinfo,
                    autentiseringsinfo,
                    brukerinfo
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
    innloggingsinfo:  selectInnloggingsinfo(state),
    registreringstatus: selectRegistreringstatus(state),
    brukerinfo: selectBrukerInfo(state),
    featureToggles: selectFeatureToggles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentInnloggingsInfo:  () => dispatch(hentInnloggingsInfo()),
    hentAutentiseringsInfo:  () => dispatch(hentAutentiseringsInfo()),
    hentBrukerInfo:  () => dispatch(hentBrukerInfo()),
    hentRegistreringStatus: (featureToggles) => dispatch(hentRegistreringStatus(featureToggles)),
    hentFeatureToggles: () => dispatch(hentFeatureToggles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(HentInitialData)
);