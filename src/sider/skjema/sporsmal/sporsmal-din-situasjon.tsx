import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Alternativ from '../alternativ';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { getTekstIdForSvar } from '../skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import {
    ingenYrkesbakgrunn, selectSisteStilling,
    Stilling,
    velgSisteStilling
} from '../../../ducks/siste-stilling';
import { AppState } from '../../../reducer';
import {
    selectOversettelseAvStillingFraAAReg,
} from '../../../ducks/oversettelse-av-stilling-fra-aareg';
import { hentOversattStillingFraAAReg } from './sporsmal-siste-stilling/siste-stilling-utils';
import { DinSituasjonSvar, Svar } from '../../../ducks/svar-utils';

interface DispatchProps {
    velgStilling: (stilling: Stilling) => void;
}

interface StateProps {
    defaultStilling: Stilling;
    sisteStilling: Stilling;
}

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
    hentAvgittSvar: (sporsmalId: string) => Svar | undefined;
}

type Props = SporsmalProps & InjectedIntlProps & DispatchProps & StateProps;

class SporsmalDinSituasjon extends React.Component<Props> {
    render() {
        const {endreSvar, hentAvgittSvar, sporsmalId, intl, velgStilling, defaultStilling, sisteStilling} = this.props;
        const fellesProps = {
            intl: intl,
            avgiSvar: (svar: Svar) => {
                endreSvar(sporsmalId, svar);
                if (svar === DinSituasjonSvar.ALDRI_HATT_JOBB) {
                    velgStilling(ingenYrkesbakgrunn);
                } else if (sisteStilling.label !== defaultStilling.label) {
                    velgStilling(defaultStilling);
                }
            },
            getTekstId: (svar: Svar) => getTekstIdForSvar(sporsmalId, svar),
            hentAvgittSvar: () => hentAvgittSvar(sporsmalId)
        };

        return (
            <>
                <Innholdstittel tag="h1" className="spm-tittel">
                    {intl.messages[`${sporsmalId}-tittel`]}
                </Innholdstittel>
                <form className="form-skjema">
                    <Alternativ svar={DinSituasjonSvar.MISTET_JOBBEN} {...fellesProps}/>
                    <Alternativ svar={DinSituasjonSvar.ALDRI_HATT_JOBB} {...fellesProps}/>
                    <Alternativ svar={DinSituasjonSvar.HAR_SAGT_OPP} {...fellesProps}/>
                    <Alternativ svar={DinSituasjonSvar.VIL_BYTTE_JOBB} {...fellesProps}/>
                    <Alternativ svar={DinSituasjonSvar.ER_PERMITTERT} {...fellesProps}/>
                    <Alternativ svar={DinSituasjonSvar.USIKKER_JOBBSITUASJON} {...fellesProps}/>
                    <Alternativ svar={DinSituasjonSvar.JOBB_OVER_2_AAR} {...fellesProps}/>
                    <Alternativ svar={DinSituasjonSvar.VIL_FORTSETTE_I_JOBB} {...fellesProps}/>
                </form>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    defaultStilling: hentOversattStillingFraAAReg(selectOversettelseAvStillingFraAAReg(state).data),
    sisteStilling: selectSisteStilling(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SporsmalDinSituasjon));
