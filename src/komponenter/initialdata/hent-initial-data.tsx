import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../reducer';
import {
    hentBrukersNavn,
    selectBrukersNavn,
    State as BrukersNavnState } from '../../ducks/brukers-navn';
import {
    hentBrukersFnr,
    selectBrukersFnr,
    State as BrukersFnrState,
} from '../../ducks/brukers-fnr';
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
    brukersNavn: BrukersNavnState;
    autentiseringsinfo: AuthState;
    registreringstatus: RegistreringstatusState;
    brukersFnr: BrukersFnrState;
    featureToggles: FeatureTogglesData;
}

interface DispatchProps {
    hentBrukersNavn: () => Promise<void | {}>;
    hentAutentiseringsInfo: () => Promise<void | {}>;
    hentBrukersFnr: () => void;
    hentRegistreringStatus: () => void;
    hentFeatureToggles: () => Promise<void | {}>;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export class HentInitialData extends React.Component<Props> {
    componentWillMount() {

        this.props.hentFeatureToggles().then(() => {
            this.props.hentAutentiseringsInfo().then((res) => {
                if ((res as AuthData).harGyldigOidcToken) {
                    this.props.hentRegistreringStatus();
                    this.props.hentBrukersFnr();
                    this.props.hentBrukersNavn();
                }
            });
        });
    }

    render() {
        const { children, registreringstatus, autentiseringsinfo, brukersNavn, intl, brukersFnr } = this.props;
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
                    brukersNavn,
                    autentiseringsinfo,
                    brukersFnr
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
    brukersFnr: selectBrukersFnr(state),
    featureToggles: selectFeatureToggles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentBrukersNavn: () => dispatch(hentBrukersNavn()),
    hentBrukersFnr: () => dispatch(hentBrukersFnr()),
    hentAutentiseringsInfo:  () => dispatch(hentAutentiseringsInfo()),
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
    hentFeatureToggles: () => dispatch(hentFeatureToggles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(HentInitialData)
);