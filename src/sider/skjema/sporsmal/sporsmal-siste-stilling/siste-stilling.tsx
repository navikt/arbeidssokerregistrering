import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {
    selectSisteStillingFraAAReg,
    State as SisteArbeidsforholdState,
} from '../../../../ducks/siste-stilling-fra-aareg';
import { AppState } from '../../../../reducer';
import {
    hentStillingFraPamGittStyrkkode, selectSisteStillingNavnFraPam,
    selectOversettelseAvStillingFraAAReg,
    State as OversettelseAvStillingFraAARegState
} from '../../../../ducks/oversettelse-av-stilling-fra-aareg';
import EkspanderbartInfo from '../../../../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import SokeInput from './sokeinput';
import {
    ingenYrkesbakgrunn,
    selectSisteStilling,
    Stilling,
    velgSisteStilling
} from '../../../../ducks/siste-stilling';
import { getIntlTekst, getTekstIdForSvar } from '../../skjema-utils';
import Alternativ from '../../alternativ';
import { hentOversattStillingFraAAReg } from './siste-stilling-utils';
import { DinSituasjonSvar, SisteStillingSvar, Svar } from '../../../../ducks/svar-utils';
import { State as SvarState } from '../../../../ducks/svar';

interface SkjemaProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
    hentAvgittSvar: (sporsmalId: string) => Svar | undefined;
}

interface StateProps {
    sisteStillingFraAAReg: SisteArbeidsforholdState;
    oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
    labelTilStillingFraAAReg: string;
    sisteStilling: Stilling;
    svarState: SvarState;
}

interface DispatchProps {
    hentStillingFraPamGittStyrkkode: (styrk98: string | undefined) => Promise<void | {}>;
    velgStilling: (stilling: Stilling) => void;
}

type Props = SkjemaProps & StateProps & DispatchProps & InjectedIntlProps;

class SisteStilling extends React.Component<Props> {
    componentWillMount() {
        const {
            endreSvar,
            sporsmalId,
            sisteStilling,
        } = this.props;

        endreSvar(
            sporsmalId,
            sisteStilling === ingenYrkesbakgrunn
                ? SisteStillingSvar.HAR_IKKE_HATT_JOBB
                : SisteStillingSvar.HAR_HATT_JOBB
        );
    }

    skalViseStillingsfelt() {
        return (this.props.hentAvgittSvar(this.props.sporsmalId) !== SisteStillingSvar.HAR_IKKE_HATT_JOBB);
    }

    skalSkjuleSvaralternativer() {
        const situasjonerDerViAlleredeVetAtBrukerenHarHattJobb: (DinSituasjonSvar | undefined)[] = [
            DinSituasjonSvar.MISTET_JOBBEN,
            DinSituasjonSvar.HAR_SAGT_OPP,
            DinSituasjonSvar.ER_PERMITTERT,
            DinSituasjonSvar.JOBB_OVER_2_AAR,
            DinSituasjonSvar.DELTIDSJOBB_VIL_MER,
            DinSituasjonSvar.VIL_BYTTE_JOBB,
            DinSituasjonSvar.ALDRI_HATT_JOBB,
            DinSituasjonSvar.VIL_FORTSETTE_I_JOBB,
        ];
        return situasjonerDerViAlleredeVetAtBrukerenHarHattJobb.includes(this.props.svarState.dinSituasjon);
    }

    angiSvarPaaDetteSporsmaletSomIkkeBesvart() {
        const {svarState, endreSvar, sporsmalId} = this.props;
        if (svarState.sisteStilling !== SisteStillingSvar.INGEN_SVAR) {
            endreSvar(sporsmalId, SisteStillingSvar.INGEN_SVAR);
        }
    }

    render() {
        const {
            sisteStilling,
            intl,
            endreSvar,
            sporsmalId,
            hentAvgittSvar,
            velgStilling,
            oversettelseAvStillingFraAAReg
        } = this.props;

        const alternativProps = {
            intl,
            getTekstId: (svar: Svar) => getTekstIdForSvar(sporsmalId, svar),
            hentAvgittSvar: () => hentAvgittSvar(sporsmalId)
        };
        const skjulSvaralternativer = this.skalSkjuleSvaralternativer();
        if (skjulSvaralternativer) {
            this.angiSvarPaaDetteSporsmaletSomIkkeBesvart();
        }
        const alternativer = skjulSvaralternativer ? (null) : (
            <form className="spm-skjema">
                <Alternativ
                    svar={SisteStillingSvar.HAR_HATT_JOBB}
                    {...alternativProps}
                    avgiSvar={(svar: Svar) => {
                        endreSvar(sporsmalId, svar);
                        velgStilling(hentOversattStillingFraAAReg(oversettelseAvStillingFraAAReg.data));
                    }}
                />
                <Alternativ
                    svar={SisteStillingSvar.HAR_IKKE_HATT_JOBB}
                    {...alternativProps}
                    avgiSvar={(svar: Svar) => {
                        endreSvar(sporsmalId, svar);
                        velgStilling(ingenYrkesbakgrunn);
                    }}
                />
            </form>
        );

        const getTekst = (kontekst: string) => getIntlTekst(sporsmalId, kontekst, intl);

        return (
            <>
                <div className="spm-hode">
                    <Innholdstittel tag="h1" className="spm-tittel">
                        {getTekst('tittel')}
                    </Innholdstittel>
                    <Normaltekst className="spm-beskrivelse">
                        <span dangerouslySetInnerHTML={{__html: intl.messages['siste-arbeidsforhold.ingress']}}/>
                    </Normaltekst>
                </div>
                {alternativer}
                <div className="spm-valg">
                    {this.skalViseStillingsfelt() &&
                        <SokeInput defaultStilling={sisteStilling} onChange={this.props.velgStilling}/>
                    }
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
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentStillingFraPamGittStyrkkode: (styrk: string) => dispatch(hentStillingFraPamGittStyrkkode(styrk)),
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SisteStilling));
