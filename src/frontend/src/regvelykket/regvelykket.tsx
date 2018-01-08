import * as React from 'react';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import PanelBlokk from '../felles/panel-blokk';
import KnappNeste from '../komponenter/knapp-neste';
import { RouteComponentProps } from 'react-router';

function RegVelykket({history}: RouteComponentProps<History>) {
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
                tittelId="overskrift-regvelykket"
                tittelCssNavnVariant="gronn-variant"
                beskrivelseId="beskrivelse-regvelykket"
            />
        </PanelBlokkGruppe>
    );
}

export default RegVelykket;