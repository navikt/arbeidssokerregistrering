import * as React from 'react';
import { connect } from 'react-redux';
import { Data as RegistreringstatusData, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { AppState } from '../../reducer';
import SblRegistrering from '../../sider/oppsummering/sbl-registrering';
import { sendBrukerTilVeientilarbeid } from './utils';

interface SjekkRegistreringstatusConfig {
    sendBrukerTilVeientilarbeid: () => void;
}

interface OwnProps {
    config?: SjekkRegistreringstatusConfig;
}

interface StateProps {
    registreringstatusData: RegistreringstatusData;
}

type Props = OwnProps & StateProps;

class SjekkRegistreringstatus extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        config: {
            sendBrukerTilVeientilarbeid: sendBrukerTilVeientilarbeid,
        }
    };
    render () {
        const {registreringstatusData, config, children} = this.props;
        if (registreringstatusData.underOppfolging) {
            config!.sendBrukerTilVeientilarbeid();
            return null;
        } else if (!registreringstatusData.oppfyllerKrav) {
            return <SblRegistrering/>;
        } else {
            return <React.Fragment>{children}</React.Fragment>;
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    registreringstatusData: selectRegistreringstatus(state).data,
});

export default connect(mapStateToProps)(
    SjekkRegistreringstatus
);