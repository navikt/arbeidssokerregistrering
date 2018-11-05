import * as React from 'react';
import Alternativ from '../../komponenter/skjema/alternativ';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    getIntlTekstForSporsmal,
    getTekstIdForSvar,
    kanGaaTilNeste,
    TekstKontekst
} from '../../komponenter/skjema/skjema-utils';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { endreSvarAction, SporsmalId } from '../../ducks/svar';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import { FremtidigSituasjonSvar, hentSvar, Svar } from '../../ducks/svar-utils';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import LenkeNeste from '../../komponenter/knapper/lenke-neste';
import { SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import {Props as SkjemaProps } from '../../komponenter/skjema/skjema';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { RegistreringType } from '../../ducks/registreringstatus';

interface OwnState {
    visAdvarsel: boolean;
}

class Inngangssporsmal extends React.Component<SkjemaProps, OwnState> {

    constructor(props: SkjemaProps) {
        super(props);

        this.state = {
            visAdvarsel: false
        };

    }

    handleNesteBtnClick = (): void => {
        const gaaTilNeste = kanGaaTilNeste(this.props.svarState, SporsmalId.fremtidigSituasjon);
        this.setState({ visAdvarsel: !gaaTilNeste });
    }

    handleTilbakeBtnClick = (): void => {
        this.setState({ visAdvarsel: false });
        this.props.history.goBack();
    }

    render() {
        const sporsmalId = SporsmalId.fremtidigSituasjon;
        const { intl, endreSvar, svarState } = this.props;
        const advarselElement = this.state.visAdvarsel ? (
            <NavAlertStripe type="advarsel" className="spm-advarsel">
                <FormattedMessage id="skjema.alternativ.advarsel.tekst"/>
            </NavAlertStripe>) : null;

        const alternativProps = {
            endreSvar: endreSvar,
            intl: intl,
            avgiSvar: (svar: Svar) => endreSvar(sporsmalId, svar),
            getTekstId: (svar: Svar) => getTekstIdForSvar(sporsmalId, svar),
            hentAvgittSvar: () => hentSvar(svarState, sporsmalId),
        };

        const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(sporsmalId,
            kontekst, intl, RegistreringType.SYKMELDT_REGISTRERING);
        const nesteUrl = `${SKJEMA_SYKEFRAVAER_PATH}/${this.finnLop(hentSvar(svarState, sporsmalId) as FremtidigSituasjonSvar)}/0`; // tslint:disable-line
        const kanGaaTilNesteTmp = kanGaaTilNeste(this.props.svarState, SporsmalId.fremtidigSituasjon);

        return (
            <ResponsivSide>
                <form className="spm-skjema">
                    <fieldset className="skjema__fieldset">
                        <legend className="skjema__legend spm-hode">
                            <Innholdstittel tag="h1" className="spm-tittel">
                                {getTekst('tittel')}
                            </Innholdstittel>
                            <Normaltekst className="spm-ingress">
                                {getTekst('ingress')}
                            </Normaltekst>
                        </legend>
                        <div className="spm-body">
                            <Alternativ svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER} {...alternativProps}/>
                            <Alternativ svar={FremtidigSituasjonSvar.NY_ARBEIDSGIVER} {...alternativProps}/>
                            <Alternativ svar={FremtidigSituasjonSvar.USIKKER} {...alternativProps}/>
                            <Alternativ svar={FremtidigSituasjonSvar.INGEN_PASSER} {...alternativProps}/>
                        </div>
                        {advarselElement}
                    </fieldset>
                </form>
                <LenkeNeste
                    onClick={this.handleNesteBtnClick}
                    href={nesteUrl}
                    erAktiv={kanGaaTilNesteTmp}
                />
                <LenkeTilbake
                    onClick={this.handleTilbakeBtnClick}
                />
                <LenkeAvbryt/>
            </ResponsivSide>
        );
    }

    finnLop(svar: FremtidigSituasjonSvar): number {
        switch (svar) {
            case FremtidigSituasjonSvar.NY_ARBEIDSGIVER: return 1;
            case FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER: return 2;
            case FremtidigSituasjonSvar.USIKKER: return 3;
            case FremtidigSituasjonSvar.INGEN_PASSER: return 4;
            default: return 0;
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Inngangssporsmal) as any); // tslint:disable-line