import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { Panel } from 'nav-frontend-paneler';
import Alertstripe from 'nav-frontend-alertstriper';
import { uniLogger } from '../../metrikker/uni-logger';

const melding = props => {
  const { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging } = props;
  const hideAll = () => {
      const results = window.document.querySelectorAll("[id$='-result']")
      results.forEach(element => element.className = 'hidden')
  }
  const handleClick = event => {
    const id = event.target.id
    const key = `${id}-result`
    const metricName = `registrering.ikke-arbeidssoker-utenfor-oppfolging.click.${id}`
    const result = window.document.getElementById(key)
    if (result) {
        hideAll()
        result.className = 'show-result-text'
    }
    uniLogger(metricName, { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging })
  }
  return (
    <Panel border className="nav-veilederpanel">
        <Alertstripe type="advarsel" className="blokk-s">
            Vi får dessverre ikke registrert deg som arbeidssøker
        </Alertstripe>
        <Normaltekst>
            <strong>Hvilken situasjon er nærmest din?</strong>
        </Normaltekst>
        <Fieldset legend="" id="veiledervalg">
            <Radio label={'Jeg har søkt arbeidsavklaringspenger'} name="oppfolging" id="aap" onChange={ handleClick } />
            <Normaltekst className="hidden" id="aap-result">
                Da må du ringe oss så fort som mulig på 55 55 33 33.
            </Normaltekst>
            <Radio label={'Min veileder har bedt meg om å registrerer meg som arbeidssøker'} name="oppfolging" id="veileder" onChange={ handleClick } />
            <Normaltekst className="hidden" id="veileder-result">
                Da må du ringe oss på 55 55 33 33, tastevalg 2.
            </Normaltekst>
            <Radio label={'Jeg er her av andre grunner'} name="oppfolging" id="andre" onChange={ handleClick } />
            <Normaltekst className="hidden" id="andre-result">
                Det kan ta et døgn fra sykemeldinger går ut til alle systemene våre er oppdatert.<br />
                <strong>Hvis sykemeldingen gikk ut for over 24 timer siden må du ringe oss på 55 55 33 33.</strong>
                <br /><br />
                Er det andre årsaker så ring oss på 55 55 33 39, tastevalg 3.
            </Normaltekst>
        </Fieldset>
    </Panel>
  )
}

export default melding
