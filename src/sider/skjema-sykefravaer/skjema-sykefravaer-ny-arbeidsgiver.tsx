import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { endreSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { hentSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import { SkjemaConfig } from '../../komponenter/skjema/skjema-utils';
import Utdanningsporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning';
import UtdanningGodkjentSporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning-godkjent';
import UtdanningBestattSporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning-bestatt';
import AndreForhold from '../skjema-registrering/sporsmal/sporsmal-andre-forhold';
import { RegistreringType } from '../../ducks/registreringstatus';

interface DispatchProps {
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
        const {endreSvar, intl, svarState, location, match, history} = this.props;
        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {
                endreSvar(sporsmalId, svar);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
        };

        const regType = RegistreringType.SYKMELDT_REGISTRERING;

        return (
            <Skjema
                config={skjemaFlytNyArbeidsgiver}
                baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/1`}
                endUrl={OPPSUMMERING_PATH}
                {...{location, match, history}}
            >
                <Utdanningsporsmal
                    sporsmalId={SporsmalId.utdanning}
                    {...fellesProps}
                    registeringType={regType}
                />
                <UtdanningGodkjentSporsmal
                    sporsmalId={SporsmalId.utdanningGodkjent}
                    {...fellesProps}
                    registeringType={regType}
                />
                <UtdanningBestattSporsmal
                    sporsmalId={SporsmalId.utdanningBestatt}
                    {...fellesProps}
                    registeringType={regType}
                />
                <AndreForhold
                    sporsmalId={SporsmalId.andreForhold}
                    {...fellesProps}
                    registeringType={regType}
                />
            </Skjema>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaerNyArbeidsgiver));