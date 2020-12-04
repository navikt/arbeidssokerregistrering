import * as React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import { LOGINSERVICEURL } from '../../ducks/api'
import './stepup.less'
import InfoNavKontor from './info-nav-kontor'
import InfoElektroniskId from './info-elektronisk-id'

const StepUp = () => (
  <section className='stepup'>
    <div className='limit stepup__login'>
      <Systemtittel className='tittel'>
        <FormattedMessage id='overskrift-stepup' />
      </Systemtittel>
      <Normaltekst className='beskrivelse'><FormattedMessage id='stepup-melding' /></Normaltekst>
      <div className='knapper-vertikalt'>
        <a
          className='knapp knapp--hoved stepup__knapp'
          href={LOGINSERVICEURL}
        >
          <Normaltekst>
            <FormattedHTMLMessage id='knapp-logg-inn' />
          </Normaltekst>
        </a>
      </div>
    </div>
    <div className='stepup__hjelp'>
      <div className='stepup__hjelp__innhold limit'>
        <Systemtittel className='tittel'>
          <FormattedMessage id='overskrift-hjelp-stepup' />
        </Systemtittel>
        <div className='stepup__hjelp__kort'>
          <InfoElektroniskId />
          <InfoNavKontor />
        </div>
      </div>
    </div>
  </section>
)

export default StepUp
