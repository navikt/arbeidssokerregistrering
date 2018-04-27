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
import Tilbakeknapp from '../../komponenter/knapper/tilbakeknapp';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import SokeInput from './sokeinput';
import { selectSisteStilling, Stilling, tomStilling, velgSisteStilling } from '../../ducks/siste-stilling';

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
                        const koderFraPam = this.props.oversettelseAvStillingFraAAReg.data.koder;
                        let stilling: Stilling = tomStilling;
                        if (koderFraPam.length > 0) {
                            stilling = {
                                label: koderFraPam[0].label,
                                styrk08: koderFraPam[0].kode,
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
            >
                <PanelBlokkGruppe className="blokk-xs">
                    <Tilbakeknapp onClick={this.onTilbake}/>
                    <PanelBlokk
                        tittelId="siste-arbeidsforhold.tittel"
                        tittelCssNavnVariant="transparent-variant"
                        beskrivelseId="siste-arbeidsforhold.ingress"
                        cssVariant="padding-vertikalt-xsmall"
                    />
                    <PanelBlokk cssVariant="transparent-variant padding-vertikalt-xsmall ">
                        <SokeInput defaultStilling={sisteStilling} onChange={this.props.velgStilling}/>
                        <EkspanderbartInfo tittelId="siste-arbeidsforhold.info.tittel" className="blokk">
                            <Normaltekst>
                                <FormattedMessage id="siste-arbeidsforhold.info.tekst"/>
                            </Normaltekst>
                        </EkspanderbartInfo>
                        <Knappervertikalt>
                            <KnappNeste onClick={this.onNeste}/>
                            <LenkeAvbryt />
                        </Knappervertikalt>
                    </PanelBlokk>
                </PanelBlokkGruppe>

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