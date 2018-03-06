import * as React from 'react';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import { RouteComponentProps } from 'react-router';
import { VEIENTILARBEID_URL } from '../../ducks/api';

function RegVellykket({history}: RouteComponentProps<History>) {
    return (
        <PanelBlokkGruppe
            knappAksjoner={
                <KnappNeste
                    key="2"
                    onClick={(() => {
                        document.location.href = VEIENTILARBEID_URL;
                    })}
                />
            }
        >
            <PanelBlokk
                tittelId="overskrift-regvellykket"
                tittelCssNavnVariant="gronn-variant"
                beskrivelseId="beskrivelse-regvellykket"
            />
        </PanelBlokkGruppe>
    );
}

export default RegVellykket;