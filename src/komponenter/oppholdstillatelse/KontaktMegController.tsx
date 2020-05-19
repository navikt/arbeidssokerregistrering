import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { Data as FeatureToggleData, selectFeatureToggles } from '../../ducks/feature-toggles';
import { opprettKontaktmegOppgave, selectOpprettKontaktmegOppgaveResult } from '../../ducks/oppgave';
import { selectKontaktinfo, State as KontaktinfoState } from '../../ducks/kontaktinfo';
import { OppgaveSuccess, OppgaveErrorTooSoon, OppgaveError, KontaktMegForm } from './';

import './kontakt-meg-melding.less';

interface DispatchProps {
    opprettKontaktmegOppgave: () => void;
}

interface StateProps {
    registreringType?: RegistreringType;
    oppgaveStatus: any;
    kontaktinfo: KontaktinfoState;
    featureToggles: FeatureToggleData;
}

type AllProps = StateProps & DispatchProps;

class KontaktMegController extends React.Component<AllProps> {

    render() {
        const { kontaktinfo, opprettKontaktmegOppgave, featureToggles } = this.props;
        const oppgaveStatus = this.props.oppgaveStatus.status;
        const oppgaveStatusCode = this.props.oppgaveStatus.data.status;
        const visKontaktopplysninger = featureToggles["arbeidssokerregistrering.kontaktopplysninger"];

        return (
            <>
                {oppgaveStatus === 'NOT_STARTED' ? <KontaktMegForm opprettKontaktmegOppgave={opprettKontaktmegOppgave} /> : null}
                {oppgaveStatus === 'PENDING' ? <div className="blokk-m center"><NavFrontendSpinner type="XXL" /></div> : null}
                {oppgaveStatus === 'OK' ? <OppgaveSuccess visKontaktopplysninger={visKontaktopplysninger} kontaktinfo={kontaktinfo} /> : null}
                {oppgaveStatus === 'ERROR' ? oppgaveStatusCode === 403 ? <OppgaveErrorTooSoon visKontaktopplysninger={visKontaktopplysninger} kontaktinfo={kontaktinfo} /> : <OppgaveError /> : null}
            </>
        );
    };
};

const mapStateToProps = (state: AppState): StateProps => ({
    registreringType: selectRegistreringstatus(state).data.registreringType,
    oppgaveStatus: selectOpprettKontaktmegOppgaveResult(state),
    kontaktinfo: selectKontaktinfo(state),
    featureToggles: selectFeatureToggles(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    opprettKontaktmegOppgave: () => dispatch(opprettKontaktmegOppgave())
});

export default connect(mapStateToProps, mapDispatchToProps)(KontaktMegController);
