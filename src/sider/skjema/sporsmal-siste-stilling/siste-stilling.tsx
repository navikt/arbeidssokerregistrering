import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
    hentStyrkkodeForSisteStillingFraAAReg,
    selectSisteStillingFraAAReg,
    State as SisteArbeidsforholdState,
} from '../../../ducks/siste-stilling-fra-aareg';
import Innholdslaster from '../../../komponenter/innholdslaster/innholdslaster';
import Feilmelding from '../../../komponenter/initialdata/feilmelding';
import { AppState } from '../../../reducer';
import {
    hentStillingFraPamGittStyrkkode, selectSisteStillingNavnFraPam,
    selectOversettelseAvStillingFraAAReg,
    State as OversettelseAvStillingFraAARegState
} from '../../../ducks/oversettelse-av-stilling-fra-aareg';
import EkspanderbartInfo from '../../../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import SokeInput from './sokeinput';
import { selectSisteStilling, Stilling, tomStilling, velgSisteStilling } from '../../../ducks/siste-stilling';
import Loader from '../../../komponenter/loader/loader';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

interface SkjemaProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

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

type Props = SkjemaProps & StateProps & DispatchProps & InjectedIntlProps;

class SisteStilling extends React.Component<Props> {
    componentWillMount() {
        // Tre steg: 1. hent styrk98 fra AAReg, 2. oversett til styrk08 via PAM, 3. sett stillingen som default
        if (this.props.sisteStilling === tomStilling) {
            this.props.hentStyrkkodeForSisteStillingFraAAReg()
                .then(() => {
                    const {styrk} = this.props.sisteStillingFraAAReg.data;
                    this.props.hentStillingFraPamGittStyrkkode(styrk).then(() => {
                        const koderFraPam = this.props.oversettelseAvStillingFraAAReg.data.konseptMedStyrk08List;
                        let stilling: Stilling = tomStilling;
                        if (koderFraPam.length > 0) {
                            stilling = {
                                label: koderFraPam[0].label,
                                styrk08: koderFraPam[0].styrk08[0],
                                konseptId: koderFraPam[0].konseptId === undefined ? -1 : koderFraPam[0].konseptId!,
                            };
                        }
                        this.props.velgStilling(stilling);
                    });
                });
        }
    }

    render() {
        const {sisteStillingFraAAReg, oversettelseAvStillingFraAAReg, sisteStilling, intl} = this.props;
        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[sisteStillingFraAAReg, oversettelseAvStillingFraAAReg]}
                storrelse="XXL"
                loaderKomponent={<Loader/>}
            >
                <Innholdstittel className="tittel">
                    <FormattedMessage id="siste-arbeidsforhold.tittel"/>
                </Innholdstittel>
                <Normaltekst className="beskrivelse">
                    <FormattedMessage id="siste-arbeidsforhold.ingress"/>
                </Normaltekst>

                <SokeInput defaultStilling={sisteStilling} onChange={this.props.velgStilling}/>
                <EkspanderbartInfo tittelId="siste-arbeidsforhold.info.tittel" className="ekspanderbartinfo">
                    <Normaltekst>
                        <FormattedMessage id="siste-arbeidsforhold.info.tekst"/>
                    </Normaltekst>
                </EkspanderbartInfo>
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

export default connect(mapStateToProps, mapDispatchToProps)(SisteStilling);
