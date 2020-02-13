import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { uniLogger } from '../../metrikker/uni-logger';
import { AppState } from '../../reducer';
import { opprettKontaktmegOppgave } from '../../ducks/oppgave';

interface DispatchProps {
    opprettKontaktmegOppgave: () => void;
}

interface StateProps {
    state: AppState;
}

type Props = StateProps & DispatchProps;

const OppgaveSuccess = () => {
    return (
        <div>
        <Alertstripe type="suksess">
            <Normaltekst>Din henvendelse er mottatt.</Normaltekst>
            <Normaltekst>Forventet svartid på denne henvendelsen er to arbeidsdager.</Normaltekst>
        </Alertstripe>
        </div>
    )
};

const OppgaveError = () => {
    return (
        <div>
        <Alertstripe type="advarsel">
            <Normaltekst>Din henvendelse feilet.</Normaltekst>
            <Normaltekst>Ta kontakt med oss på 55 55 33 33, tastevalg 2.</Normaltekst>
        </Alertstripe>
        </div>
    )
};

const plaster = ({opprettKontaktmegOppgave, state} : Props) => {
  const oppgaveStatus = state.oppgaveStatus.status;
  const formidlingsgruppe = state.registreringStatus.data.formidlingsgruppe;
  const servicegruppe = state.registreringStatus.data.servicegruppe;
  const geografiskTilknytning = state.registreringStatus.data.geografiskTilknytning;
  const rettighetsgruppe = state.registreringStatus.data.rettighetsgruppe;

  const hideAll = () => {
    const results = window.document.querySelectorAll("[id$='-result']");
    results.forEach(element => element.className = 'hidden');
  };
  
  const handleClickKontaktMeg = event => {
    const panel = document.getElementById('kontaktMegPanel');
    if (panel) {
        opprettKontaktmegOppgave();
        uniLogger('registrering.allerede-registrert.plaster.click.send-henvendelse', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
        panel.className = 'hidden';
    }
  };

  const handleClickDialog = () => {
    uniLogger('registrering.allerede-registrert.plaster.click.dialog', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });     
  }

 const handleClickContact = event => {
    const hensikt = event.target.id;
    const key = `${hensikt}-result`;
    const loggerKey = `registrering.allerede-registrert.plaster.click.kontakt-meg-${hensikt}`;
    const result = window.document.getElementById(key);
    if (result) {
        hideAll();
        result.className = 'show-result-text';
    }
    uniLogger(loggerKey, { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
  };

  return (
    <Row className="">
        <Column xs="12" sm="8" className="allerede-registrert__boks">
            <div className="allerede-registrert__boks-innhold venstrejustert">
                <div id="kontaktMegPanel">
                    <Alertstripe type="info" className="blokk-s">
                        Vi må hjelpe deg videre i andre kanaler
                    </Alertstripe>
                    <Systemtittel>Hvorfor vil du registrere deg?</Systemtittel>
                    <div className="blokk-s" id="kontaktMegMeldingWrapper">
                        <Fieldset legend="">
                            <Radio label={'Jeg vil søke dagpenger'} name="kontaktmeg" id="dagpenger" onChange={handleClickContact} />
                            <div id="dagpenger-result" className="hidden">
                                <Normaltekst className="blokk-s">
                                    Du må snakke med en veileder.
                                </Normaltekst>
                                {oppgaveStatus === 'NOT_STARTED' ? <Knapp id="kontaktMegKnapp" className="blokk-s" onClick={handleClickKontaktMeg}>Kontakt meg</Knapp>: null}
                            </div>
                            <Radio label={'Jeg vil søke arbeidsavklaringspenger (AAP)'} name="kontaktmeg" id="aap" onChange={handleClickContact} />
                            <Normaltekst className="hidden" id="aap-result">
                                For å søke AAP må du ta kontakt med NAV.<br/>
                                <a href="/aktivitetsplan/dialog/ny/" target="_blank" rel="noreferrer noopener" onClick={handleClickDialog}>Send melding til veilederen din</a> eller ring oss på <strong>55 55 33 33</strong>.
                            </Normaltekst>
                            <Radio label={'Jeg vil opprette CV eller jobbprofil'} name="kontaktmeg" id="cv" onChange={handleClickContact} />
                            <Normaltekst className="hidden" id="cv-result">
                                <a href="https://www.arbeidsplassen.no" id="arbeidsplassen" target="_blank" rel="noreferrer noopener" onClick={handleClickContact}>Gå til Arbeidsplassen.no</a> for å opprette CV og jobbprofil.
                            </Normaltekst>
                            <Radio label={'Jeg finner ikke det jeg leter etter'} id="finnerikke" onChange={handleClickContact} name="kontaktmeg" />
                            <Normaltekst className="hidden" id="finnerikke-result">
                                <a href="/aktivitetsplan/dialog/ny/" target="_blank" rel="noreferrer noopener" onClick={handleClickDialog}>Send melding til veilederen din</a> eller ring oss på <strong>55 55 33 33</strong> så skal vi hjelpe deg videre.
                            </Normaltekst>
                            <Radio label={'Andre grunner'} id="annet" onChange={handleClickContact} name="kontaktmeg" />
                            <Normaltekst className="hidden" id="annet-result">
                                <a href="/aktivitetsplan/dialog/ny/" target="_blank" rel="noreferrer noopener" onClick={handleClickDialog}>Send melding til veilederen din</a> eller ring oss på <strong>55 55 33 33</strong> så skal vi hjelpe deg videre.
                            </Normaltekst>
                        </Fieldset>
                    </div>
                </div>
                { oppgaveStatus === 'OK' ? <OppgaveSuccess /> : null}
                { oppgaveStatus === 'ERROR' ? <OppgaveError /> : null}
            </div>
        </Column>
    </Row>
  )
};

const mapStateToProps = (state: AppState): StateProps => ({
    state
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    opprettKontaktmegOppgave: () => dispatch(opprettKontaktmegOppgave())
});

export default connect(mapStateToProps, mapDispatchToProps)(plaster);
