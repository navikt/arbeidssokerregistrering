import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { endreSvarAction, resetSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { hentSvar, Svar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import { nullStillSporsmalSomIkkeSkalBesvares, SkjemaConfig } from '../../komponenter/skjema/skjema-utils';
import { RegistreringType } from '../../ducks/registreringstatus';
import { lopConfigType } from './skjema-sykefravaer-config';

interface DispatchProps {
    resetSvar: (sporsmalId: SporsmalId) => void;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

interface OwnProps {
    lopConfig: lopConfigType;
    lop: number;
    skjemaConfig: SkjemaConfig;
}

type Props = OwnProps & DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaer extends React.Component<Props> {

    render() {
        const {
            endreSvar,
            resetSvar,
            intl,
            lop,
            lopConfig,
            skjemaConfig,
            svarState,
            location,
            match,
            history
        } = this.props;
        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {

                nullStillSporsmalSomIkkeSkalBesvares(sporsmalId, svar, endreSvar, resetSvar);

                endreSvar(sporsmalId, svar);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
            registeringType: RegistreringType.SYKMELDT_REGISTRERING,
        };

        const sporsmal = lopConfig(fellesProps)
            .map(spmElement => spmElement.element);

        return (
            <Skjema
                config={skjemaConfig}
                baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/${lop}`}
                endUrl={OPPSUMMERING_PATH}
                {...{location, match, history}}
            >
                {sporsmal}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaer));