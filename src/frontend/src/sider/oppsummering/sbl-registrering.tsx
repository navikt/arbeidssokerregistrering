import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import { DITTNAV_URL, SBLARBEID_URL } from '../../ducks/api';

function SblRegistrering() {
    if (window.innerWidth > 768) {
        document.location.href = SBLARBEID_URL;
        return null;
    }
    return (
        <PanelBlokkGruppe
            knappAksjoner={
                [
                    <Knapp key="1" type="standard" onClick={() => document.location.href = DITTNAV_URL}>
                        <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                    </Knapp>,
                    <Knapp key="2" type="hoved" className="mml" onClick={() => document.location.href = SBLARBEID_URL}>
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