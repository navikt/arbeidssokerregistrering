import * as React from 'react';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import PanelBlokk from '../felles/panel-blokk';
import KnappNeste from '../komponenter/knapp-neste';
import { RouteComponentProps } from 'react-router';

function RegVellykket({history}: RouteComponentProps<History>) {
    return (
        <PanelBlokkGruppe
            knappAksjoner={
                <KnappNeste
                    key="2"
                    onClick={(() => {
                        history.push('/veientilarbeid');
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