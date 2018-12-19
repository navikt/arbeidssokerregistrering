import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {
    selectSisteStillingFraAAReg, State as SisteArbeidsforholdState
} from '../../../ducks/siste-stilling-fra-aareg';
import { AppState } from '../../../reducer';
import {
    hentStillingFraPamGittStyrkkode,
    selectOversettelseAvStillingFraAAReg,
    selectSisteStillingNavnFraPam,
    State as OversettelseAvStillingFraAARegState
} from '../../../ducks/oversettelse-av-stilling-fra-aareg';
import EkspanderbartInfo from '../../ekspanderbartinfo/ekspanderbartInfo';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import SokeInput from './sokeinput';
import { ingenYrkesbakgrunn, selectSisteStilling, Stilling, velgSisteStilling } from '../../../ducks/siste-stilling';
import { getIntlTekstForSporsmal, TekstKontekst } from '../../skjema/skjema-utils';
import Alternativ from '../alternativ';
import { getDefaultSvar, hentOversattStillingFraAAReg, skalSkjuleSvaralternativer } from './siste-stilling-utils';
import { DinSituasjonSvar, hentSvar, SisteStillingSvar, Svar } from '../../../ducks/svar-utils';
import { endreSvarAction, SporsmalId, State as SvarState } from '../../../ducks/svar';
import { RegistreringType, selectRegistreringstatus } from '../../../ducks/registreringstatus';
import InaktivSokeInput from './inaktiv-soke-input';
import { SporsmalProps } from '../../skjema/sporsmal-utils';

interface SisteStillingState {
    erInputAktiv: boolean;
}

interface StateProps {
    sisteStillingFraAAReg: SisteArbeidsforholdState;
    oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
    labelTilStillingFraAAReg: string;
    sisteStilling: Stilling;
    svarState: SvarState;
    registreringType: RegistreringType;
}

interface DispatchProps {
    endreSvar: (sporsmalId: string, svar: Svar) => void;
    hentStillingFraPamGittStyrkkode: (styrk98: string | undefined) => Promise<void | {}>;
    velgStilling: (stilling: Stilling) => void;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & SporsmalProps;

class SporsmalSisteStilling extends React.Component<Props, SisteStillingState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            erInputAktiv: false
        };

        this.onInputAktivert = this.onInputAktivert.bind(this);
        this.onStillingEndret = this.onStillingEndret.bind(this);
    }

    componentWillMount() {
        const {
            endreSvar,
            sisteStilling,
            svarState
        } = this.props;

        if (skalSkjuleSvaralternativer(hentSvar(svarState, SporsmalId.dinSituasjon) as DinSituasjonSvar)) {
            this.angiSvarPaaDetteSporsmaletSomIkkeBesvart();
        } else {
            endreSvar(
                SporsmalId.sisteStilling,
                getDefaultSvar(sisteStilling)
            );
        }
    }

    componentDidUpdate(prevProps: Props) {

        const { velgStilling, svarState, oversettelseAvStillingFraAAReg } = this.props;

        const prevSvar = hentSvar(prevProps.svarState, SporsmalId.sisteStilling);
        const svar = hentSvar(svarState, SporsmalId.sisteStilling) as SisteStillingSvar;

        if (prevSvar !== svar) {

            if (svar === SisteStillingSvar.HAR_HATT_JOBB) {
                velgStilling(hentOversattStillingFraAAReg(oversettelseAvStillingFraAAReg.data));
            } else if (svar === SisteStillingSvar.HAR_IKKE_HATT_JOBB) {
                velgStilling(ingenYrkesbakgrunn);
            }

        }

    }

    skalViseStillingsfelt() {
        return hentSvar(this.props.svarState, SporsmalId.sisteStilling) !== SisteStillingSvar.HAR_IKKE_HATT_JOBB;
    }

    angiSvarPaaDetteSporsmaletSomIkkeBesvart() {
        const {svarState, endreSvar} = this.props;
        if (hentSvar(svarState, SporsmalId.sisteStilling) !== SisteStillingSvar.INGEN_SVAR) {
            endreSvar(SporsmalId.sisteStilling, SisteStillingSvar.INGEN_SVAR);
        }
    }

    onInputAktivert() {
        this.setState({
            erInputAktiv: true
        });
    }

    onStillingEndret(stilling: Stilling) {
        this.props.velgStilling(stilling);
        this.setState({
            erInputAktiv: false
        });
    }

    render() {
        const {
            sisteStilling,
            intl,
            svarState,
            registreringType
        } = this.props;

        const skjulSvaralternativer = skalSkjuleSvaralternativer(
            hentSvar(svarState, SporsmalId.dinSituasjon) as DinSituasjonSvar
        );

        const alternativer = skjulSvaralternativer ? (null) : (
                    <>
                        <Alternativ
                            svar={SisteStillingSvar.HAR_HATT_JOBB}
                            sporsmalId={SporsmalId.sisteStilling}
                        />
                        <Alternativ
                            svar={SisteStillingSvar.HAR_IKKE_HATT_JOBB}
                            sporsmalId={SporsmalId.sisteStilling}
                        />
                    </>
        );

        const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(SporsmalId.sisteStilling,
            kontekst, intl, registreringType);

        const sokeInput = this.skalViseStillingsfelt() ?
            (this.state.erInputAktiv ?
                <SokeInput defaultStilling={sisteStilling} onChange={this.onStillingEndret}/>
                :
                <InaktivSokeInput stilling={sisteStilling} onInputAktivert={this.onInputAktivert} />
            )
            : null;

        return (
            <>
                <form className="spm-skjema">
                    <fieldset className="skjema__fieldset">
                        <legend className="skjema__legend spm-hode">
                            <Innholdstittel tag="h1" className="spm-tittel">
                                {getTekst('tittel')}
                            </Innholdstittel>
                            <Normaltekst className="spm-beskrivelse">
                                <span
                                    dangerouslySetInnerHTML={{__html: intl.messages['siste-arbeidsforhold.ingress']}}
                                />
                            </Normaltekst>
                        </legend>
                        <div className="spm-body">
                            {alternativer}
                        </div>
                    </fieldset>
                </form>
                <div className="spm-valg">
                    {sokeInput}
                    <EkspanderbartInfo tittelId="siste-arbeidsforhold.info.tittel" className="ekspanderbartinfo">
                        <Normaltekst>
                            <FormattedMessage id="siste-arbeidsforhold.info.tekst"/>
                        </Normaltekst>
                    </EkspanderbartInfo>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    sisteStillingFraAAReg: selectSisteStillingFraAAReg(state),
    oversettelseAvStillingFraAAReg: selectOversettelseAvStillingFraAAReg(state),
    labelTilStillingFraAAReg: selectSisteStillingNavnFraPam(state),
    sisteStilling: selectSisteStilling(state),
    svarState: state.svar,
    registreringType: selectRegistreringstatus(state).data.registreringType
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
    hentStillingFraPamGittStyrkkode: (styrk: string) => dispatch(hentStillingFraPamGittStyrkkode(styrk)),
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SporsmalSisteStilling));
