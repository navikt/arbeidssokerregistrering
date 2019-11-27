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
            <Radio label={'Jeg er sykemeldt og har søkt arbeidsavklaringspenger'} name="oppfolging" id="aap" onChange={ handleClick } />
            <Normaltekst className="hidden" id="aap-result">
                Da må du ringe oss så fort som mulig på 55 55 33 39, tastevalg 3.
            </Normaltekst>
            <Radio label={'Min veileder har bedt meg om å registrerer meg som arbeidssøker'} name="oppfolging" id="veileder" onChange={ handleClick } />
            <Normaltekst className="hidden" id="veileder-result">
                Da må du ringe oss på 55 55 33 39, tastevalg 3.
            </Normaltekst>
            <Radio label={'Jeg er 100% sykemeldt'} name="oppfolging" id="hundre" onChange={ handleClick } />
            <Normaltekst className="hidden" id="hundre-result">
                Da må du ringe oss på 55 55 33 33, tastevalg 2.
            </Normaltekst>
            <Radio label={'Jeg er 50% eller mindre sykemeldt og 50% eller mer arbeidsledig'} name="oppfolging" id="femtifemti" onChange={ handleClick } />
            <Normaltekst className="hidden" id="femtifemti-result">
                Da må du ringe oss på 55 55 33 39, tastevalg 3.
            </Normaltekst>
            <Radio label={'Jeg er mellom 50 og 100% sykemeldt'} name="oppfolging" id="femtihundre" onChange={ handleClick } />
            <Normaltekst className="hidden" id="femtihundre-result">
                Du må vente med å registrere deg til dagen etter sykemeldingen har gått ut.<br />
                <strong>Hvis sykemeldingen <i>har</i> gått ut må du ringe oss på 55 55 33 39, tastevalg 3.</strong>
            </Normaltekst>
        </Fieldset>
    </Panel>
  )
}

export default melding
