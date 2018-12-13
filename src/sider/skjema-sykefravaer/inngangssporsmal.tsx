import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    getIntlTekstForSporsmal,
    getTekstIdForSvar,
    kanGaaTilNeste,
    TekstKontekst
} from '../../komponenter/skjema/skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { endreSvarAction, setInitialState, SporsmalId } from '../../ducks/svar';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import { FremtidigSituasjonSvar, hentSvar, Svar } from '../../ducks/svar-utils';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import LenkeNeste from '../../komponenter/knapper/lenke-neste';
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import {Props as SkjemaProps } from '../../komponenter/skjema/skjema';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { RegistreringType } from '../../ducks/registreringstatus';
import './inngangssporsmal.less';
import { hentAlternativeneForInngangsporsmal, hentInngangsLoep } from './inngangssporsmal-svar-alternativene';

interface OwnState {
    visAdvarsel: boolean;
}

interface DispatchProps {
    resetSvar: () => void;
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

type AllProps = DispatchProps & SkjemaProps;

class Inngangssporsmal extends React.Component<AllProps, OwnState> {

    constructor(props: AllProps) {
        super(props);

        this.state = {
            visAdvarsel: false
        };

    }

    componentWillMount() {

        const { svarState } = this.props;

        // Ikke reset svar hvis ingen eller kun dette spørsmålet er besvart
        if (svarState.length <= 1) {
            return;
        }

        const svar = hentSvar(this.props.svarState, SporsmalId.fremtidigSituasjon);

        // Reset alle svar bortsett fra det første spørsmålet
        if (svar) {
            this.props.resetSvar();
            this.props.endreSvar(SporsmalId.fremtidigSituasjon, svar);
        }

    }

    handleNesteBtnClick = (): void => {
        const gaaTilNeste = kanGaaTilNeste(this.props.svarState, SporsmalId.fremtidigSituasjon);
        this.setState({ visAdvarsel: !gaaTilNeste });
    }

    handleTilbakeBtnClick = (): void => {
        this.setState({ visAdvarsel: false });
        this.props.history.goBack();
    }

    shouldComponentUpdate(nextProps: SkjemaProps): boolean {

        if (this.state.visAdvarsel) {
            const visAdvarsel: boolean = hentSvar(nextProps.svarState, SporsmalId.fremtidigSituasjon) === undefined;
            if (!visAdvarsel) {
                this.setState({ visAdvarsel: false });
                return false;
            }
        }

        return true;
    }

    render() {
        const sporsmalId = SporsmalId.fremtidigSituasjon;
        const { intl, endreSvar, svarState } = this.props;
        const advarselElement = this.state.visAdvarsel ? (
            <NavAlertStripe type="advarsel" className="spm-advarsel inngangssporsmal-advarsel">
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

        const kanGaaTilNesteTmp = kanGaaTilNeste(this.props.svarState, SporsmalId.fremtidigSituasjon);
        const alternativSvarene = hentAlternativeneForInngangsporsmal(alternativProps);

        return (
            <ResponsivSide>
                <form className="spm-skjema">
                    <fieldset className="skjema__fieldset">
                        <legend className="skjema__legend spm-hode">
                            <Innholdstittel tag="h1" className="spm-tittel">
                                {getTekst('tittel')}
                            </Innholdstittel>
                        </legend>
                        <div className="spm-body">
                            {alternativSvarene}
                        </div>
                        {advarselElement}
                    </fieldset>
                </form>
                <LenkeNeste
                    onClick={this.handleNesteBtnClick}
                    href={this.hentNesteUrl()}
                    erAktiv={kanGaaTilNesteTmp}
                />
                <LenkeTilbake
                    onClick={this.handleTilbakeBtnClick}
                />
                <LenkeAvbryt />
            </ResponsivSide>
        );
    }

    hentNesteUrl = (): string => {

        const svar: FremtidigSituasjonSvar = hentSvar(this.props.svarState,
            SporsmalId.fremtidigSituasjon) as FremtidigSituasjonSvar;

        if (svar === FremtidigSituasjonSvar.INGEN_PASSER) {
            return OPPSUMMERING_PATH;
        } else {

            const lop = hentInngangsLoep(svar);

            return `${SKJEMA_SYKEFRAVAER_PATH}/${lop}/0`;

        }

    }

}

const mapStateToProps = (state: AppState) => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    resetSvar: () => dispatch(setInitialState()),
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Inngangssporsmal));