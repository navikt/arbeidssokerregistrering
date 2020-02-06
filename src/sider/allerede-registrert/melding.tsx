import * as React from 'react';
import { connect } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { uniLogger } from '../../metrikker/uni-logger';
import { AppState } from '../../reducer';

interface StateProps {
    state: AppState;
}

type Props = StateProps;

const Melding = ({state} : Props) => {
  const registreringStatusData = state.registreringStatus.data;
  const { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe } = registreringStatusData;

  const handleClickContact = event => {
    const melding = document.getElementById('melding');
    const meldingArbeidsplassen = document.getElementById('meldingArbeidsplassen');
    const hensikt = event.target.id;
    if (melding && meldingArbeidsplassen && hensikt !== 'arbeidsplassen') {
        melding.className = hensikt === 'cv' ? 'hidden' : 'blokk-s';
        meldingArbeidsplassen.className = hensikt === 'cv' ? 'blokk-s' : 'hidden';
        uniLogger('registrering.allerede-registrert.hensikt.click', { hensikt, formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    } else if (melding && meldingArbeidsplassen && hensikt === 'arbeidsplassen') {
        uniLogger('registrering.allerede-registrert.click.arbeidsplassen', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
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
                            <Radio label={'Jeg vil søke dagpenger'} name="kontaktmeg" id="dagpenger" onChange={handleClickContact} />
                            <Radio label={'Jeg vil søke arbeidsavklaringspenger (AAP)'} name="kontaktmeg" id="aap" onChange={handleClickContact} />
                            <Radio label={'Jeg vil opprette CV eller jobbprofil'} name="kontaktmeg" id="cv" onChange={handleClickContact} />
                            <Radio label={'Andre grunner'} id="annet" onChange={handleClickContact} name="kontaktmeg" />
                        </Fieldset>
                        <Normaltekst className="hidden" id="meldingArbeidsplassen">
                            Du må <a href="https://www.arbeidsplassen.no" id="arbeidsplassen" target="_blank" rel="noreferrer noopener" onClick={handleClickContact}>gå til Arbeidsplassen.no</a> for å opprette CV og jobbprofil.
                        </Normaltekst>
                        <Normaltekst className="hidden" id="melding">
                            Du må ringe oss på <strong>55 55 33 33</strong> eller opprette en dialog, så hjelper vi deg videre.
                        </Normaltekst>
                    </div>
                </div>
            </div>
        </Column>
    </Row>
  )
};

const mapStateToProps = (state: AppState): StateProps => ({
    state
});

export default connect(mapStateToProps)(Melding);
