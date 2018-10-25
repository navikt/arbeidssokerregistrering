import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MatchProps } from '../utils/utils';
import { AppState } from '../reducer';
import {
    Data as RegistreringstatusData, RegistreringType,
    selectRegistreringstatus
} from '../ducks/registreringstatus';
import Startside from './start/startside';
import { REAKTIVERING_PATH } from '../utils/konstanter';

interface StateProps {
    registreringstatusData: RegistreringstatusData;
}

type StartRedirecterProps = StateProps & RouteComponentProps<MatchProps>;

export class StartRedirecter extends React.Component<StartRedirecterProps> {
    render() {
        const {registreringstatusData, history, match, location} = this.props;

        if (registreringstatusData.registreringType === RegistreringType.REAKTIVERING) {
            history.push(REAKTIVERING_PATH);
        }

        return (
            <Startside match={match} location={location} history={history}/>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    registreringstatusData: selectRegistreringstatus(state).data
});

export default connect(mapStateToProps)(StartRedirecter);
