import * as React from 'react';
import AndreForhold from './sporsmal/sporsmal-andre-forhold';
import HelseHinder from './sporsmal/sporsmal-helse-hinder';
import UtdanningBestattSporsmal from './sporsmal/sporsmal-utdanning-bestatt';
import UtdanningGodkjentSporsmal from './sporsmal/sporsmal-utdanning-godkjent';
import Utdanningsporsmal from './sporsmal/sporsmal-utdanning';
import SporsmalDinSituasjon from './sporsmal/sporsmal-din-situasjon';
import LastInnSisteStilling from './last-inn-siste-stilling';
import SisteStilling from './sporsmal/sporsmal-siste-stilling/siste-stilling';
import SkjemaContainer from '../../komponenter/skjema/skjema-container';
import { endreSvarAction, State as SvarState } from '../../ducks/svar';
import { Svar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

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
            <LastInnSisteStilling>
                <SkjemaContainer {...{location, match, history}}>
                    <SporsmalDinSituasjon sporsmalId="dinSituasjon" {...fellesProps}/>
                    <SisteStilling sporsmalId="sisteStilling" {...fellesProps}/>
                    <Utdanningsporsmal sporsmalId="utdanning" {...fellesProps}/>
                    <UtdanningGodkjentSporsmal sporsmalId="utdanningGodkjent" {...fellesProps}/>
                    <UtdanningBestattSporsmal sporsmalId="utdanningBestatt" {...fellesProps}/>
                    <HelseHinder sporsmalId="helseHinder" {...fellesProps}/>
                    <AndreForhold sporsmalId="andreForhold" {...fellesProps}/>
                </SkjemaContainer>
            </LastInnSisteStilling>
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