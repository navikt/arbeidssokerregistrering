import * as React from 'react'
import { getTekstIdForArbeidSisteManeder } from './oppsummering-utils'
import OppsummeringElement from './oppsummering-element'
import './ordinaer-oppsummering-besvarelser.less'
import { hentElementOppsummering } from '../skjema-registrering/skjema-sporsmalene'
import { State as SvarState } from '../../ducks/svar'
import { Data as RegStatusData } from '../../ducks/registreringstatus'
import { State as SisteStillingState } from '../../ducks/siste-stilling'

const oppsummeringSvg = require('./oppsummering.svg')

interface OwnProps {
  svar: SvarState
  registreringStatus: RegStatusData
  sisteStilling: SisteStillingState
}

const OrdinaerOppsummeringBesvarelser = ({ svar, registreringStatus, sisteStilling }: OwnProps) => {
  const jobbetSeksAvTolvSisteManederTekstId = getTekstIdForArbeidSisteManeder(svar, registreringStatus)

  const element = hentElementOppsummering(sisteStilling)

  return (
    <div className='ordinaer-oppsummering-besvarelser'>
      <img
        src={oppsummeringSvg}
        alt='Oppsummering sjekkliste'
        className='ordinaer-oppsummering-besvarelser__illustrasjon'
      />
      <ul className='ordinaer-oppsummering-besvarelser__list'>
        <OppsummeringElement
          tekstId={jobbetSeksAvTolvSisteManederTekstId}
          skjul={jobbetSeksAvTolvSisteManederTekstId === ''}
        />
        {element}
      </ul>
    </div>
  )
}

export default OrdinaerOppsummeringBesvarelser
