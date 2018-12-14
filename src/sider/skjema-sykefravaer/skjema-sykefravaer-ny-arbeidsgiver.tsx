import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { endreSvarAction, resetSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { FremtidigSituasjonSvar, hentSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import {
    nullStillSporsmalSomIkkeSkalBesvares,
    SkjemaConfig
} from '../../komponenter/skjema/skjema-utils';
import { RegistreringType } from '../../ducks/registreringstatus';
import {
    nyArbSporsmalConfig
} from './skjema-sykefravaer-sporsmalene';
import { hentInngangsLoep } from './inngangssporsmal-svar-alternativene';

interface DispatchProps {
    resetSvar: (sporsmalId: SporsmalId) => void;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

const skjemaFlytNyArbeidsgiver: SkjemaConfig = new Map<Svar, string[]>([
    [UtdanningSvar.INGEN_UTDANNING, ['utdanningBestatt', 'utdanningGodkjent']],
]);

type Props = DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaerNyArbeidsgiver extends React.Component<Props> {
    render() {
        const {endreSvar, resetSvar, intl, svarState, location, match, history} = this.props;
        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {

                nullStillSporsmalSomIkkeSkalBesvares(sporsmalId, svar, endreSvar, resetSvar);

                endreSvar(sporsmalId, svar);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
            registeringType: RegistreringType.SYKMELDT_REGISTRERING,
        };

        const sporsmalene = nyArbSporsmalConfig(fellesProps)
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

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    resetSvar: (sporsmalId) => dispatch(resetSvarAction(sporsmalId)),
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaerNyArbeidsgiver));