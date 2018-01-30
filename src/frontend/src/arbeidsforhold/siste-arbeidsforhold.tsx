import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import {
hentSisteArbeidsforhold, registrerSisteArbeidsforhold,
selectSisteArbeidsforhold,
State as SisteArbeidsforholdState,
Data as SisteArbeidsforholdData
} from '../ducks/siste-arbeidsforhold';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../initialdata/feilmelding';
import SisteArbeidsforholdForm from './siste-arbeidsforhold-form';
import { AppState } from '../reducer';
import { MatchProps } from '../skjema/skjema';
import { AVBRYT_PATH, FULLFOR_PATH } from '../utils/konstanter';

interface StateProps {
    sisteArbeidsforhold: SisteArbeidsforholdState;
}

interface DispatchProps {
    hentSisteArbeidsforhold: () => void;
    registrerSisteArbeidsforhold: (data: SisteArbeidsforholdData) => void;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SisteArbeidsforhold extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.sisteArbeidsforOnSubmit = this.sisteArbeidsforOnSubmit.bind(this);
    }

    componentWillMount() {
        this.props.hentSisteArbeidsforhold();
    }

    sisteArbeidsforOnSubmit(data: SisteArbeidsforholdData) {
        this.props.registrerSisteArbeidsforhold(data);
        this.props.history.push(FULLFOR_PATH);

    }

    render() {
        const { sisteArbeidsforhold, intl, history } = this.props;

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[sisteArbeidsforhold]}
                storrelse="XXL"
            >
                <SisteArbeidsforholdForm
                    onSubmit={this.sisteArbeidsforOnSubmit}
                    onAvbryt={() => history.push(AVBRYT_PATH)}
                />
            </Innholdslaster>);
    }
}

const mapStateToProps = (state) => ({
    sisteArbeidsforhold: selectSisteArbeidsforhold(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentSisteArbeidsforhold: () => dispatch(hentSisteArbeidsforhold()),
    registrerSisteArbeidsforhold: (data) => dispatch(registrerSisteArbeidsforhold(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(SisteArbeidsforhold)
);