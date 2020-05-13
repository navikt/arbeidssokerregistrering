import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import { hentBrukersNavn, selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import { hentKontaktinfo, selectKontaktinfo, State as KontaktinfoState } from '../../ducks/kontaktinfo';
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
import {
    hentFeatureToggles,
    selectFeatureTogglesState,
    State as FeatureToggleState
} from '../../ducks/feature-toggles';
import Innholdslaster from '../innholdslaster/innholdslaster';
import StepUp from './stepup';
import TjenesteOppdateres from '../../sider/tjeneste-oppdateres';
import { STATUS } from '../../ducks/api-utils';
import Loader from '../loader/loader';
import { VEILARBSTEPUP } from '../../ducks/api';
import FeilmeldingGenerell from '../feilmelding/feilmelding-generell';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { erIFSS } from '../../utils/fss-utils';
import { uniLogger } from '../../metrikker/uni-logger';

interface StateProps {
    brukersNavn: BrukersNavnState;
    autentiseringsinfo: AuthState;
    registreringstatus: RegistreringstatusState;
    featuretoggles: FeatureToggleState;
    kontaktinfo: KontaktinfoState;
}

interface DispatchProps {
    hentBrukersNavn: () => Promise<void | {}>;
    hentAutentiseringsInfo: () => Promise<void | {}>;
    hentRegistreringStatus: () => void;
    hentFeatureToggle: () => Promise<void | {}>;
    hentKontaktinfo: () => Promise<void | {}>;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export class HentInitialData extends React.Component<Props> {
    componentWillMount() {

        this.props.hentFeatureToggle().then(() => {
            this.props.hentAutentiseringsInfo().then((res) => {
                if ((res as AuthData).nivaOidc === 4) {
                    this.props.hentRegistreringStatus();
                    this.props.hentBrukersNavn();
                    this.props.hentKontaktinfo();
                }
            });

        });

    }

    render() {
        const { children, registreringstatus, autentiseringsinfo, brukersNavn, featuretoggles } = this.props;
        const { niva, nivaOidc } = autentiseringsinfo.data;
        const erNede = featuretoggles.data['arbeidssokerregistrering.nedetid']
        if (erNede) {
            return (<TjenesteOppdateres />);
        } else if (autentiseringsinfo.status === STATUS.OK) {
            if (niva === 4 && nivaOidc !== 4) {
                // Bruker er allerede innlogget og har OpenAM-token på nivå 4, men mangler Oidc-token med nivå 4.
                // Redirecter til Veilarbstepup som automatisk gir bruker Oidc-token på nivå 4.
                window.location.href = VEILARBSTEPUP;
            } else if (nivaOidc !== 4) {
                // Bruker mangler Oidc-token på nivå 4.
                // Sender derfor bruker til step-up-side med forklaring og Logg-inn-knapp.
                if (niva === 3 || nivaOidc === 3) {
                    uniLogger('registrering.niva3');
                }
                return (<StepUp intl={this.props.intl} />);
            }
        }

        const feilmelding = erIFSS() && registreringstatus.status === STATUS.ERROR
            ? 'feilhandtering-ikke-tilgang-aareg'
            : 'feilmelding-generell';

        return (
            <Innholdslaster
                feilmeldingKomponent={<FeilmeldingGenerell tekstId={feilmelding} />}
                avhengigheter={[
                    registreringstatus,
                    brukersNavn,
                    autentiseringsinfo,
                    featuretoggles
                ]}
                storrelse="XXL"
                loaderKomponent={<Loader />}
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
    featuretoggles: selectFeatureTogglesState(state),
    kontaktinfo: selectKontaktinfo(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    // @ts-ignore
    hentBrukersNavn: () => dispatch(hentBrukersNavn()),
    // @ts-ignore
    hentAutentiseringsInfo: () => dispatch(hentAutentiseringsInfo()),
    // @ts-ignore
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
    // @ts-ignore
    hentFeatureToggle: () => dispatch(hentFeatureToggles()),
    // @ts-ignore
    hentKontaktinfo: () => dispatch(hentKontaktinfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HentInitialData));
