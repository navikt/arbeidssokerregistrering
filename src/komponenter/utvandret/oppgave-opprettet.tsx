import * as React from 'react'
import { Undertittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'
import Alertstripe from 'nav-frontend-alertstriper'
import virkedager from '@alheimsins/virkedager'
import prettyPrintDato from '../../utils/pretty-print-dato'
import veilederSvg from './veileder-mann.svg'
import { uniLogger } from '../../metrikker/uni-logger'
import KontaktOpplysninger from './kontaktopplysninger'
import KontaktOpplysningerMangler from './kontaktopplysninger-mangler'

interface Props {
  telefonnummerHosKrr: string | null
  telefonnummerHosNav: string | null
}

const OppgaveOpprettet = ({ telefonnummerHosKrr, telefonnummerHosNav }: Props) => {
  uniLogger('registrering.utvandret.kontaktmeg.success')

  const idag = new Date()
  const nesteVirkedag = virkedager(idag, 2)
  const datoNorsk = prettyPrintDato({ dato: nesteVirkedag, language: 'no' })
  const datoEngelsk = prettyPrintDato({ dato: nesteVirkedag, language: 'en' })

  const handleEndreOpplysningerClicked = () => {
    uniLogger('registrering.utvandret.kontaktmeg.success.endreopplysninger')
  }

  const telefonnummerRegistrert = telefonnummerHosKrr ?? telefonnummerHosNav

  return (
    <Veilederpanel
      svg={<img src={veilederSvg} alt='veileder' className='veileder-illustrasjon' />}
      type='plakat'
      kompakt
    >
      <Alertstripe type='suksess' data-testid='alertstripe'>
        <Undertittel>Henvendelse mottatt / Request received</Undertittel>
      </Alertstripe>
      <Undertittel className='tekstboks'>Viktig / Important:</Undertittel>
      <p>
        Vi kontakter deg innen utgangen av <strong>{datoNorsk}</strong>.
        Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.
      </p>
      <p>
        We will contact you before the end of <strong>{datoEngelsk}</strong>.
        Please make sure your contact details are updated.
      </p>
      {telefonnummerRegistrert
        ? <KontaktOpplysninger
          telefonnummerHosKrr={telefonnummerHosKrr}
          telefonnummerHosNav={telefonnummerHosNav}
          handleEndreOpplysningerClicked={handleEndreOpplysningerClicked}
        />
        : <KontaktOpplysningerMangler
          handleEndreOpplysningerClicked={handleEndreOpplysningerClicked}
        />}
    </Veilederpanel>
  )
}

export default OppgaveOpprettet
