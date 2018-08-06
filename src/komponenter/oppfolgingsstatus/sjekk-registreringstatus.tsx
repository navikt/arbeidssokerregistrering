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
        if (registreringstatusData.underOppfolging) {
            return <AlleredeRegistrert intl={this.props.intl} />;
        } else if (!this.beregnBrukAvNyRegistrering()) {
            return <SblRegistrering/>;
        } else {
            return <>{children}</>;
        }
    }

    beregnBrukAvNyRegistrering(): boolean {
        const {gradualRolloutNyRegistrering, brukNyRegistrering} = this.props;
        if (!brukNyRegistrering) {
            return false;
        }

        return gradualRolloutNyRegistrering;
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
