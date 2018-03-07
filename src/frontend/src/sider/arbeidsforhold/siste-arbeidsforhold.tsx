import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import {
hentSisteArbeidsforhold,
selectSisteArbeidsforhold,
State as SisteArbeidsforholdState
} from '../../ducks/siste-arbeidsforhold';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Feilmelding from '../../komponenter/initialdata/feilmelding';
import SisteArbeidsforholdForm from './siste-arbeidsforhold-form';
import { AppState } from '../../reducer';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import { STATUS } from '../../ducks/api-utils';
import { FULLFOR_PATH } from '../../utils/konstanter';
import {
    hentStillingFraPAM,
    selectStillingFraPam,
    State as StillingFraPamState
} from '../../ducks/stilling-fra-pam';

interface StateProps {
    sisteArbeidsforhold: SisteArbeidsforholdState;
    stillingFraPam: StillingFraPamState;
}

interface DispatchProps {
    hentSisteArbeidsforhold: () => Promise<void | {}>;
    hentStillingFraPAM: (styrk: string | undefined) => void;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SisteArbeidsforhold extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.sisteArbeidsforhold.status === STATUS.NOT_STARTED) {
            
            this.props.hentSisteArbeidsforhold()
                .then(() => {
                    const { styrk } = this.props.sisteArbeidsforhold.data;
                    this.props.hentStillingFraPAM(styrk);
                });
        }
    }

    render() {
        const { sisteArbeidsforhold, stillingFraPam, intl, history } = this.props;

        /*tslint:disable:no-console*/
        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[sisteArbeidsforhold, stillingFraPam]}
                storrelse="XXL"
            >
                <SisteArbeidsforholdForm onSubmit={(data) => history.push(FULLFOR_PATH)} history={history}/>
            </Innholdslaster>);
    }
}

const mapStateToProps = (state) => ({
    sisteArbeidsforhold: selectSisteArbeidsforhold(state),
    stillingFraPam: selectStillingFraPam(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentSisteArbeidsforhold: () => dispatch(hentSisteArbeidsforhold()),
    hentStillingFraPAM: (styrk: string) => dispatch(hentStillingFraPAM(styrk))
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(SisteArbeidsforhold)
);