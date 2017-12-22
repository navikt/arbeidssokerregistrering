import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import PanelBlokk from '../felles/panel-blokk';

export const sblUrl = '/sbl/arbeid/registrering';

function SblRegistrering() {
    if (window.innerWidth > 768) {
        document.location.href = sblUrl;
        return null;
    }
    return (
        <PanelBlokk
            tittelId="overskrift-registrering-pc"
            tittelCssNavnVariant="rod-variant"
            beskrivelseId="beskrivelse-registrering-pc"
            knappAksjoner={
                [
                    <Knapp key="1" type="standard">
                        <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                    </Knapp>,
                    <Knapp key="2" type="hoved" className="mml" onClick={() => document.location.href = sblUrl}>
                        <FormattedMessage id="knapp-sbl-registrering-neste"/>
                    </Knapp>
                ]
            }
        />
    );
}

export default SblRegistrering;