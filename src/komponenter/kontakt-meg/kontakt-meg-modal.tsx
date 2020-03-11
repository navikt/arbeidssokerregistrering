import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendModal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema'
import Alertstripe from 'nav-frontend-alertstriper';
import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { opprettKontaktmegOppgave, selectOpprettKontaktmegOppgaveStatus } from '../../ducks/oppgave';
import { uniLogger } from '../../metrikker/uni-logger';

import './kontakt-meg-modal.less';

const avbrytSvg = require('./avbryt.svg');

interface DispatchProps {
  opprettKontaktmegOppgave: () => void;
}

interface OwnProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface StateProps {
    registreringType?: RegistreringType;
    oppgaveStatus: any;
}

interface LocaleState {
    isNotConfirmed: boolean;
}

type AllProps = OwnProps & StateProps & DispatchProps;

class AvbrytModal extends React.Component<AllProps> {
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

    handleRegistreringAvbrytKnappClicked = () => {
        uniLogger('registrering.modal.kontaktmeg');
        this.props.onRequestClose()
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
                  <Normaltekst>Din henvendelse er mottatt.</Normaltekst>
                  <Normaltekst>Forventet svartid på denne henvendelsen er to arbeidsdager.</Normaltekst>
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

        const toggleConfirm = event => {
            this.setConfirmed(!event.target.checked)
        }

        return (
            <NavFrontendModal
                isOpen={this.props.isOpen}
                contentLabel="Lukk"
                onRequestClose={this.props.onRequestClose}
                closeButton={false}
                className="avbryt-modal"
            >
                <Veilederpanel
                    type="plakat"
                    kompakt={true}
                    svg={<img
                        src={avbrytSvg}
                        alt="Informasjon"
                        className="avbryt-modal__illustrasjon"
                    />}
                >
                    <Systemtittel className="avbryt-modal__beskrivelse blokk-m">
                        En veileder må hjelpe deg videre
                    </Systemtittel>
                    { oppgaveStatus === 'NOT_STARTED' ? 
                    <>
                      <Normaltekst className="blokk-m">
                        Vi tar kontakt med deg innen to arbeidsdager.                        
                      </Normaltekst>
                      <Checkbox label={'Ja, jeg vil bli kontaktet av en veileder'} onClick={toggleConfirm} />
                      <div className="avbryt-modal">
                        <Knapp className="avbryt-modal__knapp blokk-s" id="confirmKnapp" onClick={this.handleRegistreringKnappClicked} disabled={this.state['isNotConfirmed']}>
                          Send henvendelse
                        </Knapp>
                        <Knapp className="avbryt-modal__knapp" onClick={this.handleRegistreringAvbrytKnappClicked}>
                          Avbryt
                        </Knapp>
                      </div>
                    </>
                    : null}
                    { oppgaveStatus === 'OK' ? <OppgaveSuccess /> : null}
                    { oppgaveStatus === 'ERROR' ? <OppgaveError /> : null}
                    { oppgaveStatus === 'OK' || oppgaveStatus === 'ERROR' ?
                    <div className="avbryt-modal">
                    <Knapp className="avbryt-modal__knapp" onClick={this.handleRegistreringAvbrytKnappClicked}>
                      Lukk
                    </Knapp>
                    </div>
                    : null}
                </Veilederpanel>
                
            </NavFrontendModal>
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

export default connect(mapStateToProps, mapDispatchToProps)(AvbrytModal);