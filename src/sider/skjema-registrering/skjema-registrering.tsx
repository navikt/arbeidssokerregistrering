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
import { endreSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { hentSvar, Svar } from '../../ducks/svar-utils';
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
            hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
        };

        return (
            <LastInnSisteStilling>
                <SkjemaContainer {...{location, match, history}}>
                    <SporsmalDinSituasjon sporsmalId={SporsmalId.dinSituasjon} {...fellesProps}/>
                    <SisteStilling sporsmalId={SporsmalId.sisteStilling} {...fellesProps}/>
                    <Utdanningsporsmal sporsmalId={SporsmalId.utdanning} {...fellesProps}/>
                    <UtdanningGodkjentSporsmal sporsmalId={SporsmalId.utdanningGodkjent} {...fellesProps}/>
                    <UtdanningBestattSporsmal sporsmalId={SporsmalId.utdanningBestatt} {...fellesProps}/>
                    <HelseHinder sporsmalId={SporsmalId.helseHinder} {...fellesProps}/>
                    <AndreForhold sporsmalId={SporsmalId.andreForhold} {...fellesProps}/>
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