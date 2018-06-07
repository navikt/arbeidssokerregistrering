import * as React from 'react';
import FeilmeldingBrukersStatusUgyldig from './feilmelding-brukers-status-ugyldig';
import FeilmeldingGenerell from './feilmelding-generell';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RegistreringStatus } from '../fullfor';
import { MatchProps } from '../../../utils/utils';
import { RouteComponentProps } from 'react-router';

type Props = InjectedIntlProps & RouteComponentProps<MatchProps>;

class Feilhandtering extends React.Component<Props> {
    render() {
        const status: RegistreringStatus | undefined = this.props.match.params.status;

        if (status !== undefined) {
            switch (status) {
                case (RegistreringStatus.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET):
                case (RegistreringStatus.BRUKER_ER_UKJENT):
                case (RegistreringStatus.BRUKER_MANGLER_ARBEIDSTILLATELSE): {
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

export default injectIntl(Feilhandtering);