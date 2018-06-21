import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Panel } from 'nav-frontend-paneler';
import Alternativ from '../alternativ';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { getTekstIdForAlternativ } from '../skjema-utils';
import { Systemtittel } from 'nav-frontend-typografi';
import {
    ingenYrkesbakgrunn,
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
}

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

type Props = SporsmalProps & InjectedIntlProps & DispatchProps & StateProps;

class SporsmalDinSituasjon extends React.Component<Props> {
    render() {
        const {endreSvar, hentAvgittSvar, sporsmalId, intl, velgStilling, defaultStilling} = this.props;
        const fellesProps = {
            intl: intl,
            avgiSvar: (alternativId: number) => {
                endreSvar(sporsmalId, alternativId);
                velgStilling(alternativId === 2 ? ingenYrkesbakgrunn : defaultStilling);
            },
            getTekstId: (alternativId: number) => getTekstIdForAlternativ(sporsmalId, alternativId),
            hentAvgittSvar: () => hentAvgittSvar(sporsmalId)
        };

        return (
            <div>
                <Systemtittel tag="h1" className="spm-tittel">
                    {intl.messages[`${sporsmalId}-tittel`]}
                </Systemtittel>
                <Panel className="panel-skjema">
                    <form className="form-skjema">
                        <Alternativ alternativId={1} {...fellesProps}/>
                        <Alternativ alternativId={2} {...fellesProps}/>
                        <Alternativ alternativId={3} {...fellesProps}/>
                        <Alternativ alternativId={4} {...fellesProps}/>
                        <Alternativ alternativId={5} {...fellesProps}/>
                        <Alternativ alternativId={6} {...fellesProps}/>
                        <Alternativ alternativId={7} {...fellesProps}/>
                        <Alternativ alternativId={8} {...fellesProps}/>
                    </form>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    defaultStilling: hentOversattStillingFraAAReg(selectOversettelseAvStillingFraAAReg(state).data),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    velgStilling: (stilling: Stilling) => dispatch(velgSisteStilling(stilling)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SporsmalDinSituasjon));