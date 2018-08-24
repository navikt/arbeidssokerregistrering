import * as React from 'react';
import { connect } from 'react-redux';
import {Data as RegistreringstatusData, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { AppState } from '../../reducer';
import SblRegistrering from '../../sider/sbl-registrering/sbl-registrering';
import AlleredeRegistrert from '../../sider/allerede-registrert/allerede-registrert';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import { selectBrukNyRegistreringFeatureToggle,
    selectGradualRolloutNyRegistreringFeatureToggle } from '../../ducks/feature-toggles';

interface StateProps {
    registreringstatusData: RegistreringstatusData;
    brukNyRegistrering: boolean;
    gradualRolloutNyRegistrering: boolean;
}

type Props = StateProps & InjectedIntlProps;

class SjekkRegistreringstatus extends React.PureComponent<Props> {

    render () {
        const {registreringstatusData, children} = this.props;
        if (registreringstatusData.underOppfolging && !registreringstatusData.kreverReaktivering) {
            return <AlleredeRegistrert intl={this.props.intl} />;
        } else if (!this.brukNyRegistrering()) {
            if (registreringstatusData.erIkkeArbeidssokerUtenOppfolging) {
                return <SblRegistrering opprettKunMinIdBruker={true}/>;
            } else {
                return <SblRegistrering />;
            }
        } else {
            return <>{children}</>;
        }
    }

    brukNyRegistrering(): boolean {
        const {gradualRolloutNyRegistrering, brukNyRegistrering, registreringstatusData} = this.props;
        if (registreringstatusData.erIkkeArbeidssokerUtenOppfolging) {
            return false;
        }
        return brukNyRegistrering && gradualRolloutNyRegistrering;
    }
}

const mapStateToProps = (state: AppState) => ({
    registreringstatusData: selectRegistreringstatus(state).data,
    brukNyRegistrering: selectBrukNyRegistreringFeatureToggle(state),
    gradualRolloutNyRegistrering: selectGradualRolloutNyRegistreringFeatureToggle(state),
});

export default connect(mapStateToProps)(
    injectIntl(SjekkRegistreringstatus)
);
