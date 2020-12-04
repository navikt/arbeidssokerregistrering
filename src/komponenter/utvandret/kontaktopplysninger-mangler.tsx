import { Feilmelding } from 'nav-frontend-typografi'
import Hjelpetekst from 'nav-frontend-hjelpetekst'
import EksternLenke from '../ekstern-lenke/ekstern-lenke'
import * as React from 'react'

interface Props {
  handleEndreOpplysningerClicked: () => void
}

const KontaktOpplysningerMangler = ({ handleEndreOpplysningerClicked }: Props) => (
  <>
    <div style={{ display: 'flex' }}>
      <Feilmelding data-testid='feilmelding'>
        Ingen kontaktopplysninger funnet! / No contact details found!
      </Feilmelding>
      <Hjelpetekst className='tekstboks'>
        Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.
        / Please make sure your contact details are updated or we will be unable to reach you.
      </Hjelpetekst>
    </div>
    <EksternLenke
      url='https://www.nav.no/person/personopplysninger/#kontaktinformasjon'
      tekst='Legg inn kontaktopplysninger / Enter contact details'
      data-testid='ekstern-lenke-legg-inn-opplysninger'
      onClick={handleEndreOpplysningerClicked}
    />
  </>
)

export default KontaktOpplysningerMangler
