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
import { getTekstIdForSvar } from '../../skjema-utils';
import Alternativ from '../../alternativ';
import { hentOversattStillingFraAAReg } from './siste-stilling-utils';
import { SisteStillingSvar, Svar } from '../../../../ducks/svar-utils';

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

    brukerHarHattJobb() {
        return (this.props.hentAvgittSvar(this.props.sporsmalId) === SisteStillingSvar.HAR_HATT_JOBB);
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

        return (
            <>
                <div className="sporsmal__oppe">
                    <Innholdstittel tag="h1" className="spm-tittel">
                        {intl.messages[`${sporsmalId}-tittel`]}
                    </Innholdstittel>
                    <Normaltekst className="spm-beskrivelse">
                        <span dangerouslySetInnerHTML={{__html: intl.messages['siste-arbeidsforhold.ingress']}}/>
                    </Normaltekst>
                </div>
                <form className="form-skjema">
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
                <div className="sporsmal__nede">
                    {this.brukerHarHattJobb() &&
                    <>
                        <SokeInput defaultStilling={sisteStilling} onChange={this.props.velgStilling}/>
                    </>
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
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentStillingFraPamGittStyrkkode: (styrk: string) => dispatch(hentStillingFraPamGittStyrkkode(styrk)),
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SisteStilling));
