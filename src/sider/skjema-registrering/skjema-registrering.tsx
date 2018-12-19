import * as React from 'react';
import LastInnSisteStilling from './last-inn-siste-stilling';
import { endreSvarAction, resetSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { finnEndretSvar, Svar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import Skjema from '../../komponenter/skjema/skjema';
import { OPPSUMMERING_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import {
    defaultConfigForSporsmalsflyt,
    nullStillSporsmalSomIkkeSkalBesvares
} from '../../komponenter/skjema/skjema-utils';
import { RegistreringType } from '../../ducks/registreringstatus';
import hentRegistreringSporsmalene from './skjema-sporsmalene';

interface DispatchProps {
    resetSvar: (sporsmalId: SporsmalId) => void;
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

type Props = DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaRegistrering extends React.Component<Props> {

    componentDidUpdate(prevProps: Props) {

        const { svarState, resetSvar, endreSvar } = this.props;

        const endretSvar = finnEndretSvar(prevProps.svarState, svarState);

        if (endretSvar && endretSvar.svar) {
            nullStillSporsmalSomIkkeSkalBesvares(endretSvar.sporsmalId, endretSvar.svar, endreSvar, resetSvar);
        }

    }

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

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    resetSvar: (sporsmalId) => dispatch(resetSvarAction(sporsmalId)),
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaRegistrering));