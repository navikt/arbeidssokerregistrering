import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { Panel } from 'nav-frontend-paneler';
import Alertstripe from 'nav-frontend-alertstriper';
import { uniLogger } from '../../metrikker/uni-logger';

const melding = props => {
  const { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging } = props;

  const handleClickLog = event => {
    const id = event.target.id;
    const metricName = `registrering.ikke-arbeidssoker-utenfor-oppfolging.click.${id}`;
    uniLogger(metricName, { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging });
  };

  const hideAll = () => {
      const results = window.document.querySelectorAll("[id$='-result']");
      results.forEach(element => element.className = 'hidden');
  };

  const handleClick = event => {
    const id = event.target.id;
    const key = `${id}-result`;
    const result = window.document.getElementById(key);
    if (result) {
        hideAll();
        result.className = 'show-result-text';
    }
    handleClickLog(event);
  };

  return (
    <div className="info-for-ikke-arbeidssoker">
      <Panel border className="nav-veilederpanel">
        <Alertstripe type="info" className="blokk-s">
            Vi må hjelpe deg videre i andre kanaler
        </Alertstripe>
        <Normaltekst>
            <strong>Hvilken situasjon er nærmest din?</strong>
        </Normaltekst>
        <Fieldset legend="" id="veiledervalg">
            <Radio label={'Jeg har søkt arbeidsavklaringspenger'} name="oppfolging" id="aap-sokt" onChange={ handleClick } />
            <Normaltekst className="hidden" id="aap-sokt-result">
                Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio label={'Jeg skal søke arbeidsavklaringspenger'} name="oppfolging" id="aap-skal-soke" onChange={ handleClick } />
            <Normaltekst className="hidden" id="aap-skal-soke-result">
                Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio label={'Jeg skal opprette CV eller jobbprofil'} name="oppfolging" id="cv" onChange={ handleClick } />
            <Normaltekst className="hidden" id="cv-result">
                <a href="https://www.arbeidsplassen.no" id='arbeidsplassen' target="_blank" rel="noopener noreferrer" onClick={ handleClickLog } >Gå til Arbeidsplassen.no</a> for å opprette CV og jobbprofil.
            </Normaltekst>
            <Radio label={'Jeg har blitt arbeidsledig og skal søke dagpenger'} name="oppfolging" id="dagpenger" onChange={ handleClick } />
            <Normaltekst className="hidden" id="dagpenger-result">
                Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio label={'Jeg har blitt arbeidsledig og er usikker på rettighetene mine'} name="oppfolging" id="usikker" onChange={ handleClick } />
            <Normaltekst className="hidden" id="usikker-result">
                Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio label={'Min veileder har bedt meg om å registrerer meg som arbeidssøker'} name="oppfolging" id="veileder" onChange={ handleClick } />
            <Normaltekst className="hidden" id="veileder-result">
                Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio label={'Jeg finner ikke det jeg leter etter'} name="oppfolging" id="finnerikke" onChange={ handleClick } />
            <Normaltekst className="hidden" id="finnerikke-result">
                Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
            <Radio label={'Jeg er her av andre grunner'} name="oppfolging" id="andre" onChange={ handleClick } />
            <Normaltekst className="hidden" id="andre-result">
                Ring oss på 55 55 33 33 så skal vi hjelpe deg videre.
            </Normaltekst>
        </Fieldset>
      </Panel>
    </div>
  )
};

export default melding;