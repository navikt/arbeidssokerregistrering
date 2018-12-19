import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import { SkjemaConfig } from '../../komponenter/skjema/skjema-utils';
import {
    usikkerSporsmaleneConfig
} from './skjema-sykefravaer-sporsmalene';

const skjemaFlytUsikker: SkjemaConfig = new Map<Svar, string[]>([
    [UtdanningSvar.INGEN_UTDANNING, ['utdanningBestatt', 'utdanningGodkjent']],
]);

type Props = InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaerUsikker extends React.Component<Props> {
    render() {
        const {location, match, history} = this.props;
        const sporsmal = usikkerSporsmaleneConfig()
            .map(spmElement => spmElement.element);

        return (
            <Skjema
                config={skjemaFlytUsikker}
                baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/4`}
                endUrl={OPPSUMMERING_PATH}
                {...{location, match, history}}
            >
                {sporsmal}
            </Skjema>
        );
    }
}

export default injectIntl(SkjemaSykefravaerUsikker);