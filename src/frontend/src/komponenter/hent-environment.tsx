import * as React from 'react';
import { connect } from 'react-redux';
import { EnvironmentState, hentEnvironment } from '../ducks/environment';
import Innholdslaster from '../innholdslaster/innholdslaster';
import OppfolgingsstatusFeilmelding from '../oppfolgingsstatus/oppfolgingsstatus-feilmelding';

interface StateProps {
    environment: EnvironmentState;
    hentEnvironmentData: () => void;
}

type Props = StateProps;

export class HentEnvironment extends React.Component<Props> {
    componentWillMount() {
        this.props.hentEnvironmentData();
    }

    render() {
        const {children, environment} = this.props;

        return (
            <Innholdslaster
                avhengigheter={[environment]}
                feilmeldingKomponent={<OppfolgingsstatusFeilmelding/>}
                storrelse="XXL"
            >
                {children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state) => ({
    environment: state.environment
});

const mapDispatchToProps = (dispatch) => ({
    hentEnvironmentData: () => dispatch(hentEnvironment())
});

export default connect(mapStateToProps, mapDispatchToProps)(HentEnvironment);