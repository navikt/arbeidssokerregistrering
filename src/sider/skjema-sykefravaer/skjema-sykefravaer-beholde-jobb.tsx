import * as React from 'react';
import NySkjema from '../../komponenter/skjema/skjema';
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

interface DispatchProps {
    endreSvar: (sporsmalId: string, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

type Props = DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaerBeholdeJobb extends React.Component<Props> {
    render() {
        const {endreSvar, intl, svarState, location, match, history} = this.props;
        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {
                endreSvar(sporsmalId, svar);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
        };

        const config = new Map<Svar, string[]>();

        return (
            <NySkjema
                config={config}
                baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/2`}
                endUrl={OPPSUMMERING_PATH}
                {...{location, match, history}}
            >
                <SporsmalHvorLangTid sporsmalId={SporsmalId.hvorLangTid} {...fellesProps}/>
                <SporsmalStillingsprosent sporsmalId={SporsmalId.stillingsprosent} {...fellesProps}/>
            </NySkjema>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaerBeholdeJobb));