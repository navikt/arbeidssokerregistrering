import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {
    hentStyrkkodeForSisteStillingFraAAReg,
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
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import SokeInput from './sokeinput';
import {
    ingenYrkesbakgrunn,
    selectSisteStilling,
    Stilling,
    velgSisteStilling
} from '../../../../ducks/siste-stilling';
import { getTekstIdForAlternativ } from '../../skjema-utils';
import Alternativ from '../../alternativ';
import { Panel } from 'nav-frontend-paneler';
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
    hentStyrkkodeForSisteStillingFraAAReg: () => Promise<void | {}>;
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
            getTekstId: (alternativId: number) => getTekstIdForAlternativ(sporsmalId, alternativId),
            hentAvgittSvar: () => hentAvgittSvar(sporsmalId)
        };

        return (
            <div>
                <Systemtittel tag="h1" className="spm-tittel">
                    {intl.messages[`${sporsmalId}-tittel`]}
                </Systemtittel>
                <Normaltekst className="beskrivelse">
                    <FormattedMessage id="siste-arbeidsforhold.ingress"/>
                </Normaltekst>
                <Panel className="panel-skjema">
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
                </Panel>
                {this.brukerHarHattJobb() &&
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
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SisteStilling));
