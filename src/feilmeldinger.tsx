import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

export function FeilmeldingMedAlertStripe (props: { id: string }) {
  return (
    <div className='container feilmelding-varsel'>
      <AlertStripeAdvarsel>
        <FormattedMessage id={props.id} />
      </AlertStripeAdvarsel>
    </div>
  )
}

export function FeilmeldingManglerFnr () {
  return (<FeilmeldingMedAlertStripe id='fnr-mangler' />)
}

export function FeilmeldingManglerEnhetId () {
  return (<FeilmeldingMedAlertStripe id='enhet-mangler' />)
}
