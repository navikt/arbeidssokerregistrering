import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import Feilmelding from './feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { getIntlMessage } from '../utils/utils';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';

function StepUp({intl}: InjectedIntlProps) {
    return (
        <PanelBlokkGruppe
            knappAksjoner={
                <Knapp
                    type="hoved"
                    onClick={() => console.log('sd')}
                >
                    <Normaltekst>{getIntlMessage(intl.messages, 'knapp-logg-inn')}</Normaltekst>
                </Knapp>
            }
        >
            <Feilmelding intl={intl} id="stepup-melding" type="info"/>
        </PanelBlokkGruppe>
    );
}

export default StepUp;