import * as React from 'react';
import LastInnSisteStilling from './last-inn-siste-stilling';
import { State as SvarState } from '../../ducks/svar';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import Skjema from '../../komponenter/skjema/skjema';
import { OPPSUMMERING_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import {
    defaultConfigForSporsmalsflyt,
} from '../../komponenter/skjema/skjema-utils';
import { RegistreringType } from '../../ducks/registreringstatus';
import hentRegistreringSporsmalene from './skjema-sporsmalene';

interface StateProps {
    svarState: SvarState;
}

type Props = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaRegistrering extends React.Component<Props> {

    render() {
        const { location, match, history } = this.props;
        const regType = RegistreringType.ORDINAER_REGISTRERING;
        const registreringSporsmalElementene = hentRegistreringSporsmalene(regType);

        return (
            <LastInnSisteStilling>
                <Skjema
                    config={defaultConfigForSporsmalsflyt}
                    baseUrl={SKJEMA_PATH}
                    endUrl={OPPSUMMERING_PATH}
                    {...{location, match, history}}
                >
                    {
                        registreringSporsmalElementene
                    }
                </Skjema>
            </LastInnSisteStilling>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

export default connect(mapStateToProps)(injectIntl(SkjemaRegistrering));