import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer';
import { ErrorData as FullforErrorData } from '../../../ducks/registrerbruker';
import Feilhandtering from '../../fullfor/feilhandtering/feilhandtering';

interface StateProps {
    errorData: FullforErrorData;
}

type Props = StateProps;

class ReaktiveringFeilhandtering extends React.Component<Props> {
    render() {
        const errorData = this.props.errorData;
        return <Feilhandtering errorData={errorData} />;
    }
}

function mapStateToProps(state: AppState) {
    return {
        errorData: (state.reaktiverBruker.data) as FullforErrorData
    };
}

export default connect(mapStateToProps)(ReaktiveringFeilhandtering);