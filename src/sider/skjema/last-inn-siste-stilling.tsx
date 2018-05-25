import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
    hentStyrkkodeForSisteStillingFraAAReg,
    selectSisteStillingFraAAReg,
    State as SisteArbeidsforholdState,
} from '../../ducks/siste-stilling-fra-aareg';
import { AppState } from '../../reducer';
import {
    hentStillingFraPamGittStyrkkode, selectSisteStillingNavnFraPam,
    selectOversettelseAvStillingFraAAReg,
    State as OversettelseAvStillingFraAARegState
} from '../../ducks/oversettelse-av-stilling-fra-aareg';
import {
    ingenYrkesbakgrunn,
    selectSisteStilling,
    Stilling,
    tomStilling,
    velgSisteStilling
} from '../../ducks/siste-stilling';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Feilmelding from '../../komponenter/initialdata/feilmelding';
import Loader from '../../komponenter/loader/loader';
import { hentOversattStillingFraAAReg } from './sporsmal/sporsmal-siste-stilling/siste-stilling-utils';
import { STATUS } from '../../ducks/api-utils';

interface StateProps {
    sisteStillingFraAAReg: SisteArbeidsforholdState;
    oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
    labelTilStillingFraAAReg: string;
    sisteStilling: Stilling;
}

interface DispatchProps {
    hentStyrkkodeForSisteStillingFraAAReg: () => Promise<void | {}>;
    hentStillingFraPamGittStyrkkode: (styrk98: string | undefined) => Promise<void | {}>;
    velgStilling: (stilling: Stilling) => void;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;
interface State {
    stillingErSatt: {status: string};
}

class LastInnSisteStilling extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            stillingErSatt: {status: STATUS.NOT_STARTED}
        };
    }

    componentWillMount() {
        const velgStilling = (stilling: Stilling) => {
            this.props.velgStilling(stilling);
            this.setState({
                stillingErSatt: {status: STATUS.OK}
            });
        };

        if (this.props.sisteStilling === tomStilling) {
            this.props.hentStyrkkodeForSisteStillingFraAAReg()
                .then(() => {
                    const {styrk} = this.props.sisteStillingFraAAReg.data;

                    this.props.hentStillingFraPamGittStyrkkode(styrk).then(() => {
                        if (styrk !== 'utenstyrkkode') {
                            velgStilling(hentOversattStillingFraAAReg(
                                this.props.oversettelseAvStillingFraAAReg.data
                            ));
                        } else {
                            velgStilling(ingenYrkesbakgrunn);
                        }
                    });
                });
        }
    }

    render() {
        const {
            sisteStillingFraAAReg,
            oversettelseAvStillingFraAAReg,
            intl,
        } = this.props;

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[sisteStillingFraAAReg, oversettelseAvStillingFraAAReg, this.state.stillingErSatt]}
                storrelse="XXL"
                loaderKomponent={<Loader/>}
            >
                {this.props.children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state) => ({
    sisteStillingFraAAReg: selectSisteStillingFraAAReg(state),
    oversettelseAvStillingFraAAReg: selectOversettelseAvStillingFraAAReg(state),
    labelTilStillingFraAAReg: selectSisteStillingNavnFraPam(state),
    sisteStilling: selectSisteStilling(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentStyrkkodeForSisteStillingFraAAReg: () => dispatch(hentStyrkkodeForSisteStillingFraAAReg()),
    hentStillingFraPamGittStyrkkode: (styrk: string) => dispatch(hentStillingFraPamGittStyrkkode(styrk)),
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LastInnSisteStilling));
