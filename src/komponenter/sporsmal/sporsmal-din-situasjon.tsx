import * as React from 'react';
import { DinSituasjonSvar, hentSvar } from '../../ducks/svar-utils';
import { SporsmalId, State as SvarState } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { annenStilling, ingenYrkesbakgrunn, Stilling, velgSisteStilling } from '../../ducks/siste-stilling';
import { situasjonerDerViVetAtBrukerenHarHattJobb } from './siste-stilling/siste-stilling-utils';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import { SporsmalProps } from '../skjema/sporsmal-utils';

interface DispatchProps {
    velgStilling: (stilling: Stilling) => void;
}

interface StateProps {
    svarState: SvarState;
    defaultStilling: Stilling;
    sisteStilling: Stilling;
}

type Props = DispatchProps & StateProps & SporsmalProps;

class SporsmalDinSituasjon extends React.Component<Props> {

    velgStillingHvisDenIkkeAlleredeErValgt(stilling: Stilling) {
        const {sisteStilling, velgStilling} = this.props;
        if (sisteStilling.label !== stilling.label) {
            velgStilling(stilling);
        }
    }

    componentDidUpdate(prevProps: Props) {

        const { velgStilling, defaultStilling, svarState } = this.props;

        const prevSvar = hentSvar(prevProps.svarState, SporsmalId.dinSituasjon);
        const svar = hentSvar(svarState, SporsmalId.dinSituasjon) as DinSituasjonSvar;

        if (prevSvar !== svar) {

            if (svar === DinSituasjonSvar.ALDRI_HATT_JOBB) {
                velgStilling(ingenYrkesbakgrunn);
            } else {

                if ((defaultStilling === ingenYrkesbakgrunn)
                    && situasjonerDerViVetAtBrukerenHarHattJobb.includes(svar)) {
                    this.velgStillingHvisDenIkkeAlleredeErValgt(annenStilling);
                }  else {
                    this.velgStillingHvisDenIkkeAlleredeErValgt(defaultStilling);
                }

            }

        }

    }

    render() {
        return (
            <Sporsmal sporsmalId={SporsmalId.dinSituasjon}>
                <Alternativ
                    svar={DinSituasjonSvar.MISTET_JOBBEN}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.HAR_SAGT_OPP}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.DELTIDSJOBB_VIL_MER}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.ALDRI_HATT_JOBB}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.VIL_BYTTE_JOBB}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.JOBB_OVER_2_AAR}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.ER_PERMITTERT}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.USIKKER_JOBBSITUASJON}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
                <Alternativ
                    svar={DinSituasjonSvar.VIL_FORTSETTE_I_JOBB}
                    sporsmalId={SporsmalId.dinSituasjon}
                />
            </Sporsmal>
        );
    }

}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
    defaultStilling: state.defaultStilling.stilling,
    sisteStilling: state.sisteStilling.data.stilling,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling))
});

export default connect(mapStateToProps, mapDispatchToProps)(SporsmalDinSituasjon);
