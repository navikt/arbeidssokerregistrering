import * as React from 'react';
import SkjemaContainer from '../../komponenter/skjema/skjema-container';
import { endreSvarAction, State as SvarState } from '../../ducks/svar';
import { Svar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import SporsmalTest1 from './sporsmal/sporsmal-test1';
import SporsmalTest2 from './sporsmal/sporsmal-test2';

interface DispatchProps {
    endreSvar: (sporsmalId: string, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

type Props = DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaRegistrering extends React.Component<Props> {
    render() {
        const {endreSvar, intl, svarState, location, match, history} = this.props;
        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {
                endreSvar(sporsmalId, svar);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: string) => svarState[sporsmalId],
        };

        return (
            <SkjemaContainer {...{location, match, history}}>
                <SporsmalTest1 sporsmalId="sporsmalTest1" {...fellesProps}/>
                <SporsmalTest2 sporsmalId="sporsmalTest2" {...fellesProps}/>
            </SkjemaContainer>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaRegistrering));