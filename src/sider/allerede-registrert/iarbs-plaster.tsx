import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
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
        <Alertstripe type="info">
            <Normaltekst>Din henvendelse er mottatt.</Normaltekst>
            <Normaltekst>Forventet svartid på denne henvendelsen er to arbeidsdager.</Normaltekst>
        </Alertstripe>
        </div>
    )
}

const OppgaveError = () => {
    return (
        <div>
        <Alertstripe type="feil">
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
  
  const handleClickKontaktMeg = event => {
    const panel = document.getElementById('kontaktMegPanel');
    if (panel) {
        opprettKontaktmegOppgave();
        uniLogger('registrering.allerede-registrert.click.kontakt-meg', { formidlingsgruppe, servicegruppe, geografiskTilknytning });
        panel.className = 'hidden';
    }
  };

 const handleClickContact = event => {
    const melding = document.getElementById('kontaktMegMelding');
    const knapp = document.getElementById('kontaktMegKnapp');
    if (melding && knapp && event.target.id === 'kontaktMegAnnet') {
        melding.className = 'blokk-s';
        knapp.className = 'hidden';
    }
    if (melding && knapp && event.target.id === 'kontaktMegDagpenger') {
        melding.className = 'hidden';
        knapp.className = 'knapp';
    }
  };

  return (
    <Row className="">
        <Column xs="12" sm="8" className="allerede-registrert__boks">
            <div className="allerede-registrert__boks-innhold venstrejustert">
                <div id="kontaktMegPanel">
                    <Alertstripe type="advarsel" className="blokk-s">
                        Vi får ikke registrert deg som arbeidssøker.
                    </Alertstripe>
                    <Normaltekst>
                        <strong>Hvis du har søkt eller ønsker å søke dagpenger, må du ta kontakt med NAV.</strong>
                    </Normaltekst>
                    <div className="blokk-s" id="kontaktMegMeldingWrapper">
                        <Fieldset legend="">
                            <Radio label={'Ja, jeg skal søke dagpenger og vil bli kontaktet av en veileder'} name="kontaktmeg" id="kontaktMegDagpenger" onChange={handleClickContact} />
                            <Radio label={'Jeg ønsker å snakke med en veileder uavhengig av dagpenger'} id="kontaktMegAnnet" onChange={handleClickContact} name="kontaktmeg" />
                        </Fieldset>
                        <Normaltekst className="hidden" id="kontaktMegMelding">
                            Hvis du ønsker å snakke om noe annet enn dagpenger, må du ringe 55 55 33 33.
                        </Normaltekst>
                        {oppgaveStatus === 'NOT_STARTED' ? <div className="midtjustert"><Knapp className="hidden" id="kontaktMegKnapp" onClick={handleClickKontaktMeg}>Send inn henvendelsen</Knapp></div>: null}
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
