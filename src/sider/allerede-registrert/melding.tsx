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

  const hideAll = () => {
    const results = window.document.querySelectorAll("[id$='-result']");
    results.forEach(element => element.className = 'hidden');
  };

  const handleClickContact = event => {
    const hensikt = event.target.id;
    const key = `${hensikt}-result`;
    const result = window.document.getElementById(key);
    if (result) {
        hideAll();
        result.className = 'blokk-s';
    }
    if (hensikt !== 'arbeidsplassen') {
        uniLogger('registrering.allerede-registrert.hensikt.click', { hensikt, formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    } else if (hensikt === 'arbeidsplassen') {
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
                            <Normaltekst className="hidden" id="dagpenger-result">
                                Opprett en dialog, eller ring oss på <strong>55 55 33 33</strong>, så hjelper vi deg videre.
                            </Normaltekst>
                            <Radio label={'Jeg vil søke arbeidsavklaringspenger (AAP)'} name="kontaktmeg" id="aap" onChange={handleClickContact} />
                            <Normaltekst className="hidden" id="aap-result">
                                Opprett en dialog, eller ring oss på <strong>55 55 33 33</strong>, så hjelper vi deg videre.
                            </Normaltekst>
                            <Radio label={'Jeg vil opprette CV eller jobbprofil'} name="kontaktmeg" id="cv" onChange={handleClickContact} />
                            <Normaltekst className="hidden" id="cv-result">
                                Du må <a href="https://www.arbeidsplassen.no" id="arbeidsplassen" target="_blank" rel="noreferrer noopener" onClick={handleClickContact}>gå til Arbeidsplassen.no</a> for å opprette CV og jobbprofil.
                            </Normaltekst>
                            <Radio label={'Jeg finner ikke det jeg leter etter'} id="finnerikke" onChange={handleClickContact} name="kontaktmeg" />
                            <Normaltekst className="hidden" id="finnerikke-result">
                                Opprett en dialog, eller ring oss på <strong>55 55 33 33</strong>, så hjelper vi deg videre.
                            </Normaltekst>
                            <Radio label={'Andre grunner'} id="annet" onChange={handleClickContact} name="kontaktmeg" />
                            <Normaltekst className="hidden" id="annet-result">
                                Opprett en dialog, eller ring oss på <strong>55 55 33 33</strong>, så hjelper vi deg videre.
                            </Normaltekst>
                        </Fieldset>
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
