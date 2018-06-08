import * as React from 'react';
import { connect } from 'react-redux';
import FeilmeldingBrukersStatusUgyldig from './feilmelding-brukers-status-ugyldig';
import FeilmeldingGenerell from './feilmelding-generell';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { AppState } from '../../../reducer';
import { ErrorData as FullforErrorData, ErrorTypes as FullforErrorTypes } from '../../../ducks/registrerbruker';

interface StateProps {
    errorData: FullforErrorData;
}

type Props = StateProps & InjectedIntlProps;

class Feilhandtering extends React.Component<Props> {
    render() {
        const errorData = this.props.errorData;
        if (errorData && errorData.data) {
            switch (errorData.data.type) {
                case (FullforErrorTypes.BRUKER_ER_UKJENT):
                case (FullforErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES):
                case (FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE):
                case (FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET): {
                    return (<FeilmeldingBrukersStatusUgyldig intl={this.props.intl}/>);
                }
                default: {
                    return (<FeilmeldingGenerell intl={this.props.intl}/>);
                }
            }
        } else {
            return (<FeilmeldingGenerell intl={this.props.intl}/>);
        }
    }
}

function mapStateToProps(state: AppState) {
    return {
        errorData: (state.registrerBruker.data) as FullforErrorData
    };
}

export default connect(mapStateToProps)(injectIntl(Feilhandtering));