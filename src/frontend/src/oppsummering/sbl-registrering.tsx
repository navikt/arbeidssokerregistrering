import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';

export const sblUrl = '/sbl/arbeid/registrering';

function SblRegistrering() {
    if (window.innerWidth > 768) {
        document.location.href = sblUrl;
        return null;
    }
    return (
        <PanelBlokkGruppe
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
        >
            <PanelBlokk
                tittelId="overskrift-registrering-pc"
                tittelCssNavnVariant="rod-variant"
                beskrivelseId="beskrivelse-registrering-pc"
            />
        </PanelBlokkGruppe>
    );
}

export default SblRegistrering;