import * as React from 'react'
import Panel from 'nav-frontend-paneler'
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi'
import { Hovedknapp } from 'nav-frontend-knapper'

import { uniLogger } from '../../metrikker/uni-logger'

import './kontakt-meg-melding.less'

interface Props {
  opprettKontaktmegOppgave: () => void
}

class KontaktMegForm extends React.Component<Props> {
  handleKontakMegClicked = () => {
    uniLogger('registrering.oppholdstillatelse.kontaktmeg')
    this.props.opprettKontaktmegOppgave()
  }

  render () {
    return (
      <Panel border>
        <Systemtittel className='avbryt-modal__beskrivelse blokk-m'>
          En veileder må hjelpe deg slik at du blir registrert
        </Systemtittel>
        <Normaltekst className='blokk-s'>
          Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.<br />
          Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.
        </Normaltekst>
        <Normaltekst className='blokk-m'>
          Kontakt oss, så hjelper vi deg videre.
        </Normaltekst>
        <div className='blokk-s'>
          <Hovedknapp className='avbryt-modal__knapp blokk-s' id='confirmKnapp' onClick={this.handleKontakMegClicked}>
            Ta kontakt / Contact us
          </Hovedknapp>
        </div>
        <Normaltekst className='blokk-s'>
          We’re not able to check whether you have an approved residency permit.<br />
          This means that you cannot register as a jobseeker online.
        </Normaltekst>
        <Normaltekst className='blokk-m'>
          Please contact us for help with this.
        </Normaltekst>
      </Panel>
    )
  }
}

export default KontaktMegForm
