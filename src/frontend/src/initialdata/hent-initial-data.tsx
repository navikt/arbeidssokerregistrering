import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../reducer';
import { hentInnloggingsInfo, selectInnloggingsinfo, State as InnloggingsinfoState } from '../ducks/innloggingsinfo';
import {
    hentRegistreringStatus,
    selectRegistreringstatus,
    State as RegistreringstatusState } from '../ducks/registreringstatus';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from './feilmelding';

interface StateProps {
    innloggingsinfo: InnloggingsinfoState;
    registreringstatus: RegistreringstatusState;
}

interface DispatchProps {
    hentInnloggingsInfo: () => void;
    hentRegistreringStatus: () => void;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export class HentInitialData extends React.Component<Props> {
    componentWillMount() {
        this.props.hentInnloggingsInfo();
        this.props.hentRegistreringStatus();
    }

    render() {
        const { children, registreringstatus, intl, innloggingsinfo } = this.props;
        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[registreringstatus, innloggingsinfo]}
                storrelse="XXL"
            >
                {children}
            </Innholdslaster>
    );
    }
}

const mapStateToProps = (state) => ({
    innloggingsinfo:  selectInnloggingsinfo(state),
    registreringstatus: selectRegistreringstatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentInnloggingsInfo:  () => dispatch(hentInnloggingsInfo()),
    hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),

});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(HentInitialData)
);