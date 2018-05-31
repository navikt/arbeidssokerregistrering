import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../reducer';
import {
    hentInnloggingsInfo,
    selectInnloggingsinfo,
    State as InnloggingsinfoState,
    Data as InnloggingsinfoData } from '../../ducks/innloggingsinfo';
import {
    hentBrukerInfo,
    selectBrukerInfo,
    State as BrukerinfoState,
} from '../../ducks/brukerinfo';
import {
    hentRegistreringStatus,
    selectRegistreringstatus,
    State as RegistreringstatusState } from '../../ducks/registreringstatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from './feilmelding';
import StepUp from './stepup';
import { STATUS } from '../../ducks/api-utils';
import Loader from '../loader/loader';

interface StateProps {
    innloggingsinfo: InnloggingsinfoState;
    registreringstatus: RegistreringstatusState;
    brukerinfo: BrukerinfoState;

}

interface DispatchProps {
    hentInnloggingsInfo: () => Promise<void | {}>;
    hentBrukerInfo: () => void;
    hentRegistreringStatus: () => void;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export class HentInitialData extends React.Component<Props> {
    componentWillMount() {

        this.props.hentBrukerInfo();

        this.props.hentInnloggingsInfo().then( (res) => {
            if ((res as InnloggingsinfoData).securityLevel === '4') {
                this.props.hentRegistreringStatus();
            }
        });
    }

    render() {
        const { children, registreringstatus, innloggingsinfo, intl } = this.props;
        const { securityLevel } = innloggingsinfo.data;

        if (securityLevel !== '4' && innloggingsinfo.status === STATUS.OK) {
            return <StepUp intl={intl} />;
        }

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[
                    registreringstatus,
                    innloggingsinfo
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
    innloggingsinfo:  selectInnloggingsinfo(state),
    registreringstatus: selectRegistreringstatus(state),
    brukerinfo: selectBrukerInfo(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentInnloggingsInfo:  () => dispatch(hentInnloggingsInfo()),
    hentBrukerInfo:  () => dispatch(hentBrukerInfo()),
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(HentInitialData)
);