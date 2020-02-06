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
}

const OppgaveError = () => {
    return (
        <div>
        <Alertstripe type="advarsel">
            <Normaltekst>Din henvendelse feilet.</Normaltekst>
            <Normaltekst>Ta kontakt med oss på 55 55 33 33, tastevalg 2.</Normaltekst>
        </Alertstripe>
        </div>
    )
}

const plaster = ({opprettKontaktmegOppgave, state} : Props) => {
  const oppgaveStatus = state.oppgaveStatus.status
  const formidlingsgruppe = state.registreringStatus.data.formidlingsgruppe;
  const servicegruppe = state.registreringStatus.data.servicegruppe;
  const geografiskTilknytning = state.registreringStatus.data.geografiskTilknytning;
  const rettighetsgruppe = state.registreringStatus.data.rettighetsgruppe;
  
  const handleClickKontaktMeg = event => {
    const panel = document.getElementById('kontaktMegPanel');
    if (panel) {
        opprettKontaktmegOppgave();
        uniLogger('registrering.allerede-registrert.plaster.click.send-henvendelse', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
        panel.className = 'hidden';
    }
  };

 const handleClickContact = event => {
    const melding = document.getElementById('kontaktMegMelding');
    const meldingDagpenger = document.getElementById('kontaktMegDagpengerMelding');
    const knapp = document.getElementById('kontaktMegKnapp');
    if (melding && meldingDagpenger && knapp && event.target.id === 'kontaktMegAnnet') {
        melding.className = 'blokk-s';
        meldingDagpenger.className = 'hidden';
        knapp.className = 'hidden';
        uniLogger('registrering.allerede-registrert.plaster.click.kontakt-meg-annet', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }
    if (meldingDagpenger && melding && knapp && event.target.id === 'kontaktMegAAPRadio') {
        melding.className = 'blokk-s';
        meldingDagpenger.className = 'hidden';
        knapp.className = 'hidden';
        uniLogger('registrering.allerede-registrert.plaster.click.kontakt-meg-aap', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }
    if (melding && meldingDagpenger && knapp && event.target.id === 'kontaktMegDagpenger') {
        melding.className = 'hidden';
        meldingDagpenger.className = 'blokk-s';
        knapp.className = 'knapp';
        uniLogger('registrering.allerede-registrert.plaster.click.kontakt-meg-dagpenger', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }
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
                            <Radio label={'Jeg vil søke dagpenger'} name="kontaktmeg" id="kontaktMegDagpenger" onChange={handleClickContact} />
                            <Radio label={'Jeg vil søke arbeidsavklaringspenger (AAP)'} name="kontaktmeg" id="kontaktMegAAPRadio" onChange={handleClickContact} />
                            <Radio label={'Andre grunner'} id="kontaktMegAnnet" onChange={handleClickContact} name="kontaktmeg" />
                        </Fieldset>
                        <Normaltekst className="hidden" id="kontaktMegDagpengerMelding">
                            Du må snakke med en veileder.
                        </Normaltekst>
                        <Normaltekst className="hidden" id="kontaktMegMelding">
                            Du må ringe oss på <strong>55 55 33 33</strong> eller opprette en dialog, så hjelper vi deg videre.
                        </Normaltekst>
                        {oppgaveStatus === 'NOT_STARTED' ? <div className="midtjustert"><Knapp className="hidden" id="kontaktMegKnapp" onClick={handleClickKontaktMeg}>Kontakt meg</Knapp></div>: null}
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
