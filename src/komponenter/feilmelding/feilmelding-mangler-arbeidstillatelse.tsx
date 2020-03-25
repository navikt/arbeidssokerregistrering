import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { InjectedIntlProps } from 'react-intl';
import Feilmelding from './feilmelding';
import utropstegnSvg from '../../sider/fullfor/utropstegn.svg';
import './feilmelding-mangler-arbeidstillatelse.less';

const FeilmeldingManglerArbeidstillatelse: React.SFC<InjectedIntlProps> = (props: InjectedIntlProps) => {

    return (
        <Feilmelding bilde={utropstegnSvg} className="feilmelding-mangler-arbeidstillatelse">
            <Normaltekst className="blokk-s">
                Vi har ikke mulighet i våre systemer til å sjekke om du har en godkjent oppholdstillatelse.
                Du kan derfor ikke registrere deg som arbeidssøker nå.
                <p>
                    Ring oss på 55 55 33 33 så hjelper vi deg videre.
                </p>
            </Normaltekst>
        </Feilmelding>
    );
};

export default FeilmeldingManglerArbeidstillatelse;
