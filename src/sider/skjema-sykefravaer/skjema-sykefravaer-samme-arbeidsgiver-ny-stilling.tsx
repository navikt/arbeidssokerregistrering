import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import { vanligFlyt } from '../../komponenter/skjema/skjema-utils';
import {
    sammeArbeidsgiverNyStillingSporsmaleneConfig
} from './skjema-sykefravaer-sporsmalene';

type Props = InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaerSammeArbeidsgiverNyStilling extends React.Component<Props> {
    render() {
        const {location, match, history} = this.props;

        const sporsmal = sammeArbeidsgiverNyStillingSporsmaleneConfig()
            .map(spmElement => spmElement.element);

        return (
            <Skjema
                config={vanligFlyt}
                baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/3`}
                endUrl={OPPSUMMERING_PATH}
                {...{location, match, history}}
            >
                {sporsmal}
            </Skjema>
        );
    }
}

export default injectIntl(SkjemaSykefravaerSammeArbeidsgiverNyStilling);