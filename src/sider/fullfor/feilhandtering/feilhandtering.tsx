import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer';
import { ErrorData, ErrorType } from '../../../ducks/registrerbruker';
import FeilmeldingGenerell from './feilmelding-generell';
import FeilmeldingSpesiell from './feilmelding-spesiell';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface StateProps {
    registrerBrukerData: ErrorData;
}

type Props = StateProps & InjectedIntlProps;

class Feilhandtering extends React.Component<Props> {
    render() {
        console.log('feilhandtering', this.props); // tslint:disable-line
        const response = this.props.registrerBrukerData.response;
        if (response === undefined) {
            return (
                <FeilmeldingGenerell intl={this.props.intl}/>
            );
        }
        switch (response.errorType) {
            case (ErrorType.BRUKER_FORSVUNNET):
            case (ErrorType.FINNES_IKKE_I_TPS):
            case (ErrorType.MANGLER_ARBEIDSTILLATELSE): {
                return (
                    <FeilmeldingSpesiell intl={this.props.intl}/>
                );
            }
            case (ErrorType.ANNET):
            default: {
                return (
                    <FeilmeldingGenerell intl={this.props.intl}/>
                );
            }
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    registrerBrukerData: state.registrerBruker.data,
});

export default connect(mapStateToProps)(injectIntl(Feilhandtering));