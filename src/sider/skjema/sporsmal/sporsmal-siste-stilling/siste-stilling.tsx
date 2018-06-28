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

        endreSvar(sporsmalId, sisteStilling === ingenYrkesbakgrunn ? 2 : 1);
    }

    brukerHarHattJobb() {
        return (this.props.hentAvgittSvar(this.props.sporsmalId) === 1);
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
            getTekstId: (alternativId: number) => getTekstIdForSvar(sporsmalId, alternativId),
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
                        alternativId={1}
                        {...alternativProps}
                        avgiSvar={(alternativId: number) => {
                            endreSvar(sporsmalId, alternativId);
                            velgStilling(hentOversattStillingFraAAReg(oversettelseAvStillingFraAAReg.data));
                        }}
                    />
                    <Alternativ
                        alternativId={2}
                        {...alternativProps}
                        avgiSvar={(alternativId: number) => {
                            endreSvar(sporsmalId, alternativId);
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
