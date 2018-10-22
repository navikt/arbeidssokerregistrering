import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { endreSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { hentSvar, Svar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import SporsmalHvorLangTid from './sporsmal/sporsmal-hvor-lang-tid';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import SporsmalStillingsprosent from './sporsmal/sporsmal-stillingsprosent';
import { vanligFlyt } from '../../komponenter/skjema/skjema-utils';

interface DispatchProps {
    endreSvar: (sporsmalId: string, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

type Props = DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaerSammeArbeidsgiver extends React.Component<Props> {
    render() {
        const {endreSvar, intl, svarState, location, match, history} = this.props;
        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {
                endreSvar(sporsmalId, svar);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
        };

        return (
            <Skjema
                config={vanligFlyt}
                baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/2`}
                endUrl={OPPSUMMERING_PATH}
                {...{location, match, history}}
            >
                <SporsmalHvorLangTid sporsmalId={SporsmalId.hvorLangTid} {...fellesProps}/>
                <SporsmalStillingsprosent sporsmalId={SporsmalId.stillingsprosent} {...fellesProps}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaerSammeArbeidsgiver));