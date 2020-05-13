import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';
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
}

type AllProps = StateProps & DispatchProps;

class KontaktMegController extends React.Component<AllProps> {

    render() {
        const { kontaktinfo, opprettKontaktmegOppgave } = this.props;
        const oppgaveStatus = this.props.oppgaveStatus.status
        const oppgaveStatusCode = this.props.oppgaveStatus.data.status

        return (
            <>
                {oppgaveStatus === 'NOT_STARTED' ? <KontaktMegForm opprettKontaktmegOppgave={opprettKontaktmegOppgave} /> : null}
                {oppgaveStatus === 'PENDING' ? <div className="blokk-m center"><NavFrontendSpinner type="XXL" /></div> : null}
                {oppgaveStatus === 'OK' ? <OppgaveSuccess kontaktinfo={kontaktinfo} /> : null}
                {oppgaveStatus === 'ERROR' ? oppgaveStatusCode === 403 ? <OppgaveErrorTooSoon kontaktinfo={kontaktinfo} /> : <OppgaveError /> : null}
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    registreringType: selectRegistreringstatus(state).data.registreringType,
    oppgaveStatus: selectOpprettKontaktmegOppgaveResult(state),
    kontaktinfo: selectKontaktinfo(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    opprettKontaktmegOppgave: () => dispatch(opprettKontaktmegOppgave())
});

export default connect(mapStateToProps, mapDispatchToProps)(KontaktMegController);
