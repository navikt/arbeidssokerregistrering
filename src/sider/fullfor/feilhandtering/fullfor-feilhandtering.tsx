import * as React from 'react';
import { connect } from 'react-redux';
import FeilmeldingBrukersStatusUgyldig from './feilmelding-brukers-status-ugyldig';
import FeilmeldingGenerell from '../../../komponenter/feilmelding/feilmelding-generell';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { AppState } from '../../../reducer';
import { ErrorData as FullforErrorData, ErrorTypes as FullforErrorTypes } from '../../../ducks/registrerbruker';

interface StateProps {
    errorData: FullforErrorData;
}

type Props = StateProps & InjectedIntlProps;

class FullforFeilhandtering extends React.Component<Props> {
    render() {
        const errorData = this.props.errorData;
        if (errorData && errorData.data) {
            switch (errorData.data.type) {
                case (FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE): {
                    return (
                        <FeilmeldingBrukersStatusUgyldig
                            feilType={FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE}
                            intl={this.props.intl}
                        />);
                }
                case (FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET): {
                    return (
                        <FeilmeldingBrukersStatusUgyldig
                            feilType={FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET}
                            intl={this.props.intl}
                        />);
                }
                case (FullforErrorTypes.BRUKER_ER_UKJENT):
                case (FullforErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES): {
                    return (<FeilmeldingBrukersStatusUgyldig feilType={''} intl={this.props.intl}/>);
                }
                default: {
                    return (<FeilmeldingGenerell />);
                }
            }
        } else {
            return (<FeilmeldingGenerell />);
        }
    }
}

function mapStateToProps(state: AppState) {
    return {
        errorData: (state.registrerBruker.data) as FullforErrorData
    };
}

export default connect(mapStateToProps)(injectIntl(FullforFeilhandtering));