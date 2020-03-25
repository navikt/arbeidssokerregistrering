import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Panel } from 'nav-frontend-paneler'
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Hovedknapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { opprettKontaktmegOppgave, selectOpprettKontaktmegOppgaveStatus } from '../../ducks/oppgave';
import { uniLogger } from '../../metrikker/uni-logger';

import './kontakt-meg-melding.less';

interface DispatchProps {
  opprettKontaktmegOppgave: () => void;
}

interface StateProps {
    registreringType?: RegistreringType;
    oppgaveStatus: any;
}

type AllProps = StateProps & DispatchProps;

class KontaktMegOppholdstillatelse extends React.Component<AllProps> {
    handleKontakMegClicked = () => {
        uniLogger('registrering.oppholdstillatelse.kontaktmeg');
        this.props.opprettKontaktmegOppgave();
    }

    render() {
        const oppgaveStatus = this.props.oppgaveStatus
        const OppgaveSuccess = () => {
          return (
              <div className="blokk-m">
              <Alertstripe type="suksess">
                  <Normaltekst className="blokk-s">Forventet svartid er to arbeidsdager.</Normaltekst>
              </Alertstripe>
              </div>
          )
        };
      
        const OppgaveError = () => {
          return (
              <div className="blokk-m">
              <Alertstripe type="advarsel">
                  <Normaltekst className="blokk-s">Din henvendelse feilet.</Normaltekst>
                  <Normaltekst className="blokk-s">Ta kontakt med oss på 55 55 33 33, tastevalg 2.</Normaltekst>
              </Alertstripe>
              </div>
          )
        };

        const OverskriftStandard = () => {
          return (
            <Systemtittel className="avbryt-modal__beskrivelse blokk-m">
              En veileder må hjelpe deg slik at du blir registrert
            </Systemtittel>
          )
        }

        const OverskriftSuccess = () => {
          return (
            <Systemtittel className="avbryt-modal__beskrivelse blokk-m">
              Din henvendelse er mottatt
            </Systemtittel>
          )
        }

        return (
          <Panel border>
            { oppgaveStatus === 'OK' ? <OverskriftSuccess /> : <OverskriftStandard />}
            { oppgaveStatus === 'NOT_STARTED' ? 
                <>
                  <Normaltekst className="blokk-s">
                    Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.<br/>
                    Dette gjør at du ikke kan registrere deg som arbeidssøker her.
                  </Normaltekst>
                  <Normaltekst className="blokk-m">
                    Kontakt oss, og så hjelper vi deg videre.
                  </Normaltekst>
                  <div className="blokk-s">
                    <Hovedknapp className="avbryt-modal__knapp blokk-s" id="confirmKnapp" onClick={this.handleKontakMegClicked}>
                      Ta kontakt / Contact us
                    </Hovedknapp>
                  </div>
                  <Normaltekst className="blokk-s">
                    We’re not able to check whether you have an approved residency permit.<br/>
                    This means that you cannot register as a jobseeker here.
                  </Normaltekst>
                  <Normaltekst className="blokk-m">
                    Please contact us for help with this.
                  </Normaltekst>
                </>
                : null}
                { oppgaveStatus === 'PENDING' ? <div className="blokk-m center"><NavFrontendSpinner type="XXL" /></div> : null}
                { oppgaveStatus === 'OK' ? <OppgaveSuccess /> : null}
                { oppgaveStatus === 'ERROR' ? <OppgaveError /> : null}
            </Panel>
    
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    registreringType: selectRegistreringstatus(state).data.registreringType,
    oppgaveStatus: selectOpprettKontaktmegOppgaveStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  opprettKontaktmegOppgave: () => dispatch(opprettKontaktmegOppgave())
});

export default connect(mapStateToProps, mapDispatchToProps)(KontaktMegOppholdstillatelse);
