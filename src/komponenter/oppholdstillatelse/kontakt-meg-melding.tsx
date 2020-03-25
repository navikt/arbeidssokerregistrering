import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Panel } from 'nav-frontend-paneler'
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema'
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

interface LocaleState {
    isNotConfirmed: boolean;
}

type AllProps = StateProps & DispatchProps;

class KontaktMegOppholdstillatelse extends React.Component<AllProps> {
    constructor (props: AllProps) {
        super(props);

        this.state = {
            isNotConfirmed: true
        }
    }

    handleRegistreringKnappClicked = () => {
        uniLogger('registrering.modal.kontaktmeg');
        this.props.opprettKontaktmegOppgave();
    }

    setConfirmed = (value: boolean) => {
        this.setState({
            isNotConfirmed: value
        })
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
                  <Normaltekst>Din henvendelse feilet.</Normaltekst>
                  <Normaltekst>Ta kontakt med oss på 55 55 33 33, tastevalg 2.</Normaltekst>
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

        const toggleConfirm = event => {
            this.setConfirmed(!event.target.checked)
        }

        return (
          <Panel border>
            { oppgaveStatus === 'OK' ? <OverskriftSuccess /> : <OverskriftStandard />}
            { oppgaveStatus === 'NOT_STARTED' ? 
                <>
                  <Normaltekst className="blokk-s">
                    Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.                     
                  </Normaltekst>
                  <Normaltekst className="blokk-s">
                    Du kan derfor ikke registrere deg som arbeidssøker nå.
                  </Normaltekst>
                  <Normaltekst className="blokk-m">
                    Send oss en henvendelse så hjelper vi deg videre.                       
                  </Normaltekst>
                  <Checkbox label={'Ja, jeg vil bli kontaktet av en veileder'} onClick={toggleConfirm} />
                  <div className="avbryt-modal">
                    <Knapp className="avbryt-modal__knapp blokk-s" id="confirmKnapp" onClick={this.handleRegistreringKnappClicked} disabled={this.state['isNotConfirmed']}>
                      Send henvendelse
                    </Knapp>
                  </div>
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
