import React from 'react'
import { Feilmelding, Undertittel } from 'nav-frontend-typografi'
import Alertstripe from 'nav-frontend-alertstriper'
import Veilederpanel from 'nav-frontend-veilederpanel'
import Hjelpetekst from 'nav-frontend-hjelpetekst'

import { State as KontaktinfoState } from '../../ducks/kontaktinfo'
import { Kontaktinformasjon } from './'
import EksternLenke from '../ekstern-lenke/ekstern-lenke'
import { uniLogger } from '../../metrikker/uni-logger'

import veilederSvg from './veileder-mann.svg'
import './kontakt-meg-melding.less'

interface Props {
  kontaktinfo: KontaktinfoState
}

const OppgaveErrorTooSoon = ({ kontaktinfo }: Props) => {
  const { status, data: { telefonnummerHosKrr, telefonnummerHosNav } } = kontaktinfo
  const telefonnummerRegistrert = telefonnummerHosKrr ?? telefonnummerHosNav

  console.log('STATUS', status)

  uniLogger('registrering.oppholdstillatelse.kontaktmeg.vennligstvent')

  const Kontaktinfo = () => <>
    {telefonnummerHosKrr
      ? <Kontaktinformasjon
        telefonnummer={telefonnummerHosKrr}
        kilde='Kontakt- og reservasjonsregisteret'
        data-testid='kontaktinformasjonskort-krr'
      /> : null}
    {telefonnummerHosNav
      ? <Kontaktinformasjon
        telefonnummer={telefonnummerHosNav}
        kilde='NAV'
        data-testid='kontaktinformasjonskort-nav'
      /> : null}
    <EksternLenke
      url='https://www.nav.no/person/personopplysninger/#kontaktinformasjon'
      tekst='Endre opplysninger / Change contact details'
      data-testid='ekstern-lenke-endre-opplysninger'
    />
                            </>

  const IngenKontaktinfo = () => <>
    <div style={{ display: 'flex' }}>
      <Feilmelding data-testid='feilmelding'>Ingen kontaktopplysninger funnet! / No contact details found!</Feilmelding>
      <Hjelpetekst className='infoboks'>
        Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.
        / Please make sure your contact details are updated or we will be unable to reach you.
      </Hjelpetekst>
    </div>
    <EksternLenke
      url='https://www.nav.no/person/personopplysninger/#kontaktinformasjon'
      tekst='Legg inn kontaktopplysninger / Enter contact details'
      data-testid='ekstern-lenke-legg-inn-opplysninger'
    />
                                 </>

  return (
    <Veilederpanel
      svg={<img src={veilederSvg} alt='veileder' className='veileder-illustrasjon' />}
      type='plakat'
      kompakt
    >
      <Alertstripe type='info' data-testid='alertstripe'>
        <Undertittel>Vennligst vent / Please wait</Undertittel>
      </Alertstripe>
      <p>
        Du har allerede bedt oss kontakte deg.
        Vi tar kontakt i løpet av to arbeidsdager regnet fra den første meldingen.
        Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.
      </p>
      <p>
        We have received your first message.
        We will contact you within two working days from the first message.
        Please make sure your contact details are updated.
      </p>
      {status === 'OK' && telefonnummerRegistrert ? <Kontaktinfo /> : <IngenKontaktinfo />}
    </Veilederpanel>
  )
}

export default OppgaveErrorTooSoon
