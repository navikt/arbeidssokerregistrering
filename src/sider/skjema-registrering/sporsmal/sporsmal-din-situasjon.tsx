import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Alternativ from '../../../komponenter/skjema/alternativ';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { getIntlTekstForSporsmal, getTekstIdForSvar } from '../../../komponenter/skjema/skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import {
    annenStilling,
    ingenYrkesbakgrunn, selectSisteStilling,
    Stilling,
    velgSisteStilling
} from '../../../ducks/siste-stilling';
import { AppState } from '../../../reducer';
import {
    situasjonerDerViVetAtBrukerenHarHattJobb
} from './sporsmal-siste-stilling/siste-stilling-utils';
import { DinSituasjonSvar, Svar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';

interface DispatchProps {
    velgStilling: (stilling: Stilling) => void;
}

interface StateProps {
    defaultStilling: Stilling;
    sisteStilling: Stilling;
}

type Props = SporsmalProps & InjectedIntlProps & DispatchProps & StateProps;

class SporsmalDinSituasjon extends React.Component<Props> {

    velgStillingHvisDenIkkeAlleredeErValgt(stilling: Stilling) {
        const {sisteStilling, velgStilling} = this.props;
        if (sisteStilling.label !== stilling.label) {
            velgStilling(stilling);
        }
    }

    render() {
        const {endreSvar, hentAvgittSvar, sporsmalId, intl, velgStilling, defaultStilling} = this.props;
        const fellesProps = {
            intl: intl,
            avgiSvar: (svar: DinSituasjonSvar) => {
                endreSvar(sporsmalId, svar);
                if (svar === DinSituasjonSvar.ALDRI_HATT_JOBB) {
                    velgStilling(ingenYrkesbakgrunn);
                } else {
                    // TODO FO-1464 Skriv test for dette.
                    if ((defaultStilling === ingenYrkesbakgrunn)
                        && situasjonerDerViVetAtBrukerenHarHattJobb.includes(svar)) {
                        this.velgStillingHvisDenIkkeAlleredeErValgt(annenStilling);
                    }  else {
                        this.velgStillingHvisDenIkkeAlleredeErValgt(defaultStilling);
                    }
                }
            },
            getTekstId: (svar: Svar) => getTekstIdForSvar(sporsmalId, svar),
            hentAvgittSvar: () => hentAvgittSvar(sporsmalId),
        };

        return (
            <form className="spm-skjema">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend spm-hode">
                        <Innholdstittel tag="h1" className="spm-tittel">
                            {getIntlTekstForSporsmal(sporsmalId, 'tittel', intl)}
                        </Innholdstittel>
                    </legend>
                    <div className="spm-body">
                        <Alternativ svar={DinSituasjonSvar.MISTET_JOBBEN} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.HAR_SAGT_OPP} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.DELTIDSJOBB_VIL_MER} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.ALDRI_HATT_JOBB} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.VIL_BYTTE_JOBB} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.JOBB_OVER_2_AAR} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.ER_PERMITTERT} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.USIKKER_JOBBSITUASJON} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING} {...fellesProps}/>
                        <Alternativ svar={DinSituasjonSvar.VIL_FORTSETTE_I_JOBB} {...fellesProps}/>
                    </div>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    defaultStilling: state.defaultStilling.stilling,
    sisteStilling: selectSisteStilling(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SporsmalDinSituasjon));
