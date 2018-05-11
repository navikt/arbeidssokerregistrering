import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import {
    hentStyrkkodeForSisteStillingFraAAReg,
    selectSisteStillingFraAAReg,
    State as SisteArbeidsforholdState,
} from '../../ducks/siste-stilling-fra-aareg';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Feilmelding from '../../komponenter/initialdata/feilmelding';
import { AppState } from '../../reducer';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import {
    hentStillingFraPamGittStyrkkode, selectSisteStillingNavnFraPam,
    selectOversettelseAvStillingFraAAReg,
    State as OversettelseAvStillingFraAARegState
} from '../../ducks/oversettelse-av-stilling-fra-aareg';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import EkspanderbartInfo from '../../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { AVBRYT_PATH, OPPSUMMERING_PATH } from '../../utils/konstanter';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import SokeInput from './sokeinput';
import { selectSisteStilling, Stilling, tomStilling, velgSisteStilling } from '../../ducks/siste-stilling';
import Loader from '../../komponenter/loader/loader';
import ResponsivSide from '../../komponenter/side/responsiv-side';

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

type Props = StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class SisteStilling extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onAvbryt = this.onAvbryt.bind(this);
        this.onTilbake = this.onTilbake.bind(this);
        this.onNeste = this.onNeste.bind(this);
    }

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

    onAvbryt() {
        this.props.history.push(AVBRYT_PATH);
    }

    onTilbake() {
        this.props.history.goBack();
    }

    onNeste() {
        this.props.history.push(OPPSUMMERING_PATH);
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
                <ResponsivSide className="siste-stilling">
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
                    <Knappervertikalt>
                        <KnappNeste onClick={this.onNeste}/>
                        <LenkeAvbryt/>
                    </Knappervertikalt>
                </ResponsivSide>
            </Innholdslaster>
        );
        /*tslint:disable:no-console*/
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

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(SisteStilling)
);