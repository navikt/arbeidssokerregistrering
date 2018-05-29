import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer';
import { ErrorData } from '../../../ducks/registrerbruker';
import FeilmeldingSpesiell from './feilmelding-spesiell';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface StateProps {
    registrerBrukerData: ErrorData;
}

type Props = StateProps & InjectedIntlProps;

class Feilhandtering extends React.Component<Props> {
    render() {
        return (
            <FeilmeldingSpesiell intl={this.props.intl}/>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    registrerBrukerData: state.registrerBruker.data,
});

export default connect(mapStateToProps)(injectIntl(Feilhandtering));