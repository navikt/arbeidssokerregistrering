import * as React from 'react';
import AndreForhold from './sporsmal/sporsmal-andre-forhold';
import HelseHinder from './sporsmal/sporsmal-helse-hinder';
import UtdanningBestattSporsmal from './sporsmal/sporsmal-utdanning-bestatt';
import UtdanningGodkjentSporsmal from './sporsmal/sporsmal-utdanning-godkjent';
import Utdanningsporsmal from './sporsmal/sporsmal-utdanning';
import SporsmalDinSituasjon from './sporsmal/sporsmal-din-situasjon';
import LastInnSisteStilling from './last-inn-siste-stilling';
import SisteStilling from './sporsmal/sporsmal-siste-stilling/siste-stilling';
import { endreSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { hentSvar, Svar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import NySkjema from '../../komponenter/skjema/ny-skjema';
import { OPPSUMMERING_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import { defaultConfigForSporsmalsflyt } from '../../komponenter/skjema/skjema-utils';

interface DispatchProps {
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

type Props = DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaRegistrering extends React.Component<Props> {
    render() {
        const {endreSvar, intl, svarState, location, match, history} = this.props;
        const sporsmalProps = {
            endreSvar: (sporsmalId, svar) => {
                endreSvar(sporsmalId, svar);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
        };

        return (
            <LastInnSisteStilling>
                <NySkjema
                    config={defaultConfigForSporsmalsflyt}
                    baseUrl={SKJEMA_PATH}
                    endUrl={OPPSUMMERING_PATH}
                    {...{location, match, history}}
                >
                    <SporsmalDinSituasjon sporsmalId={SporsmalId.dinSituasjon} {...sporsmalProps}/>
                    <SisteStilling sporsmalId={SporsmalId.sisteStilling} {...sporsmalProps}/>
                    <Utdanningsporsmal sporsmalId={SporsmalId.utdanning} {...sporsmalProps}/>
                    <UtdanningGodkjentSporsmal sporsmalId={SporsmalId.utdanningGodkjent} {...sporsmalProps}/>
                    <UtdanningBestattSporsmal sporsmalId={SporsmalId.utdanningBestatt} {...sporsmalProps}/>
                    <HelseHinder sporsmalId={SporsmalId.helseHinder} {...sporsmalProps}/>
                    <AndreForhold sporsmalId={SporsmalId.andreForhold} {...sporsmalProps}/>
                </NySkjema>
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