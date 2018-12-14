import * as React from 'react';
import Skjema from '../../komponenter/skjema/skjema';
import { endreSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { hentSvar, Svar } from '../../ducks/svar-utils';
import { AppState } from '../../reducer';
import { connect, Dispatch } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import { vanligFlyt } from '../../komponenter/skjema/skjema-utils';
import { RegistreringType } from '../../ducks/registreringstatus';

interface DispatchProps {
    endreSvar: (sporsmalId: string, svar: Svar) => void;
}

interface StateProps {
    svarState: SvarState;
}

interface OwnProps {
    lopConfig: (props: {}) => {
        element: any // tslint:disable-line
    }[];
    lop: number;
}

type Props = OwnProps & DispatchProps & StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SkjemaSykefravaerSammeArbeidsgiver extends React.Component<Props, OwnProps> {

    render() {
        const {endreSvar, intl, lop, lopConfig, svarState, location, match, history} = this.props;
        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {
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
                config={vanligFlyt}
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
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaerSammeArbeidsgiver));