import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Alternativ from '../alternativ';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { getTekstIdForAlternativ } from '../skjema-utils';
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

interface DispatchProps {
    velgStilling: (stilling: Stilling) => void;
}

interface StateProps {
    defaultStilling: Stilling;
    sisteStilling: Stilling;
}

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

type Props = SporsmalProps & InjectedIntlProps & DispatchProps & StateProps;

class SporsmalDinSituasjon extends React.Component<Props> {
    render() {
        const {endreSvar, hentAvgittSvar, sporsmalId, intl, velgStilling, defaultStilling, sisteStilling} = this.props;
        const fellesProps = {
            intl: intl,
            avgiSvar: (alternativId: number) => {
                endreSvar(sporsmalId, alternativId);
                if (alternativId === 2) {
                    velgStilling(ingenYrkesbakgrunn);
                } else if (sisteStilling.label !== defaultStilling.label) {
                    velgStilling(defaultStilling);
                }
            },
            getTekstId: (alternativId: number) => getTekstIdForAlternativ(sporsmalId, alternativId),
            hentAvgittSvar: () => hentAvgittSvar(sporsmalId)
        };

        return (
            <>
                <div className="spm-hode">
                    <Innholdstittel tag="h1" className="spm-tittel">
                        {intl.messages[`${sporsmalId}-tittel`]}
                    </Innholdstittel>
                </div>
                <form className="spm-skjema">
                    <Alternativ alternativId={1} {...fellesProps}/>
                    <Alternativ alternativId={2} {...fellesProps}/>
                    <Alternativ alternativId={3} {...fellesProps}/>
                    <Alternativ alternativId={4} {...fellesProps}/>
                    <Alternativ alternativId={5} {...fellesProps}/>
                    <Alternativ alternativId={6} {...fellesProps}/>
                    <Alternativ alternativId={7} {...fellesProps}/>
                    <Alternativ alternativId={8} {...fellesProps}/>
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
