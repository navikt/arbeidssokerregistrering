import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer';
import { ErrorData as FullforErrorData } from '../../../ducks/registrerbruker';
import Feilhandtering from '../../fullfor/feilhandtering/feilhandtering';

interface StateProps {
    errorData: FullforErrorData;
}

type Props = StateProps & InjectedIntlProps;

class ReaktiveringFeilhandtering extends React.Component<Props> {
    render() {
        const errorData = this.props.errorData;
        const intl = this.props.intl;
        return <Feilhandtering errorData={errorData} {...{intl}}/>;
    }
}

function mapStateToProps(state: AppState) {
    return {
        errorData: (state.reaktiverBruker.data) as FullforErrorData
    };
}

export default connect(mapStateToProps)(injectIntl(ReaktiveringFeilhandtering));