import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { FremtidigSituasjonSvar, hentSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import {
    SkjemaConfig
} from '../../komponenter/skjema/skjema-utils';
import {
    nyArbeidsgiverSporsmaleneConfig
} from './skjema-sykefravaer-sporsmalene';
import { hentInngangsLoep } from './inngangssporsmal-svar-alternativene';

interface StateProps {
    svarState: SvarState;
}

const skjemaFlytNyArbeidsgiver: SkjemaConfig = new Map<Svar, string[]>([
    [UtdanningSvar.INGEN_UTDANNING, ['utdanningBestatt', 'utdanningGodkjent']],
]);

type Props = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaerNyArbeidsgiver extends React.Component<Props> {

    render() {
        const {location, match, history} = this.props;

        const sporsmalene = nyArbeidsgiverSporsmaleneConfig()
            .map(spmElement => spmElement.element);

        const inngangsLoepSvar: FremtidigSituasjonSvar = hentSvar(this.props.svarState,
            SporsmalId.fremtidigSituasjon) as FremtidigSituasjonSvar;
        const inngangsLop = hentInngangsLoep(inngangsLoepSvar);

        return (
            <Skjema
                config={skjemaFlytNyArbeidsgiver}
                baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/${inngangsLop}`}
                endUrl={OPPSUMMERING_PATH}
                {...{location, match, history}}
            >
                {
                    sporsmalene
                }
            </Skjema>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

export default connect(mapStateToProps)(injectIntl(SkjemaSykefravaerNyArbeidsgiver));