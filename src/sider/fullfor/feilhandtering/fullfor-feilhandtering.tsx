import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer';
import { ErrorData as FullforErrorData } from '../../../ducks/registrerbruker';
import Feilhandtering from './feilhandtering';

interface StateProps {
    errorData: FullforErrorData;
}

type Props = StateProps;

class FullforFeilhandtering extends React.Component<Props> {
    render() {
        const errorData = this.props.errorData;
        return <Feilhandtering errorData={errorData} />;
    }
}

function mapStateToProps(state: AppState) {
    return {
        errorData: (state.registrerBruker.data) as FullforErrorData
    };
}

export default connect(mapStateToProps)(FullforFeilhandtering);