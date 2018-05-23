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
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import SokeInput from './sokeinput';
import { selectSisteStilling, Stilling, tomStilling, velgSisteStilling } from '../../../ducks/siste-stilling';
import Loader from '../../../komponenter/loader/loader';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getTekstIdForAlternativ } from '../skjema-utils';
import Alternativ from '../alternativ';
import { Panel } from 'nav-frontend-paneler';

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

    brukerHarHattJobb() {
        return (this.props.hentAvgittSvar(this.props.sporsmalId) === 1);
    }

    render() {
        const {
            sisteStillingFraAAReg,
            oversettelseAvStillingFraAAReg,
            sisteStilling,
            intl,
            endreSvar,
            sporsmalId,
            hentAvgittSvar,
        } = this.props;

        const alternativProps = {
            intl,
            avgiSvar: (alternativId: number) => endreSvar(sporsmalId, alternativId),
            getTekstId: (alternativId: number) => getTekstIdForAlternativ(sporsmalId, alternativId),
            hentAvgittSvar: () => hentAvgittSvar(sporsmalId)
        };

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl} id="feil-i-systemene-beskrivelse"/>}
                avhengigheter={[sisteStillingFraAAReg, oversettelseAvStillingFraAAReg]}
                storrelse="XXL"
                loaderKomponent={<Loader/>}
            >
                <div>
                    <Systemtittel tag="h1" className="spm-tittel">
                        {intl.messages[`${sporsmalId}-tittel`]}
                    </Systemtittel>
                    <Normaltekst className="beskrivelse">
                        <FormattedMessage id="siste-arbeidsforhold.ingress"/>
                    </Normaltekst>
                    <Panel className="panel-skjema">
                        <form className="form-skjema">
                            <Alternativ alternativId={1} {...alternativProps}/>
                            <Alternativ alternativId={2} {...alternativProps}/>
                        </form>
                    </Panel>
                </div>
                { this.brukerHarHattJobb() &&
                    <React.Fragment>
                        <Undertittel>
                            <FormattedMessage id="siste-arbeidsforhold.undertittel"/>
                        </Undertittel>
                        <SokeInput defaultStilling={sisteStilling} onChange={this.props.velgStilling}/>
                    </React.Fragment>
                }
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
