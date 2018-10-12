import * as React from 'react';
import Alternativ from '../../komponenter/skjema/alternativ';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../komponenter/skjema/skjema-utils';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { SporsmalProps } from '../../komponenter/skjema/sporsmal-utils';
import { endreSvarAction, SporsmalId, State as SvarState } from '../../ducks/svar';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import { FremtidigSituasjonSvar, hentSvar, Svar } from '../../ducks/svar-utils';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import LenkeNeste from '../../komponenter/knapper/lenke-neste';
import { SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';

interface StateProps {
    svarState: SvarState;
}

interface DispatchProps {
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

type Props = SporsmalProps & InjectedIntlProps & StateProps & DispatchProps;

class Inngangssporsmal extends React.Component<Props> {
    render() {
        const sporsmalId = SporsmalId.fremtidigSituasjon;
        
        const {intl, endreSvar, svarState} = this.props;
        const alternativProps = {
            endreSvar: endreSvar,
            intl: intl,
            avgiSvar: (svar: Svar) => endreSvar(sporsmalId, svar),
            getTekstId: (svar: Svar) => getTekstIdForSvar(sporsmalId, svar),
            hentAvgittSvar: () => hentSvar(svarState, sporsmalId),
        };
        const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(sporsmalId, kontekst, intl);
        const nesteUrl = `${SKJEMA_SYKEFRAVAER_PATH}/${this.finnLop(hentSvar(svarState, sporsmalId) as FremtidigSituasjonSvar)}/0`; // tslint:disable-line

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
                            <Alternativ svar={FremtidigSituasjonSvar.NY_ARBEIDSGIVER} {...alternativProps}/>
                            <Alternativ svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER} {...alternativProps}/>
                            <Alternativ svar={FremtidigSituasjonSvar.USIKKER} {...alternativProps}/>
                            <Alternativ svar={FremtidigSituasjonSvar.INGEN_PASSER} {...alternativProps}/>
                        </div>
                    </fieldset>
                </form>
                <LenkeNeste
                    onClick={() => {return; }}
                    href={nesteUrl}
                    erAktiv={true}
                />
                <LenkeTilbake
                    onClick={() => {return; }}
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

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Inngangssporsmal));