import AlertStripeInfoSolid from 'nav-frontend-alertstriper/lib/info-solid-alertstripe';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function FeilmeldingMedAlertStripe(props: { id: string }) {
    return (
            <div className="container feilmelding-varsel">
                <AlertStripeInfoSolid>
                    <FormattedMessage id={props.id} />
                </AlertStripeInfoSolid>
            </div>
    );
}

export function FeilmeldingManglerFnr() {
    return (<FeilmeldingMedAlertStripe id="fnr-mangler" />);
}

export function FeilmeldingManglerEnhetId() {
    return (<FeilmeldingMedAlertStripe id="enhet-mangler" />);
}
