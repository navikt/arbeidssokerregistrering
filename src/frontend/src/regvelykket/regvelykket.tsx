import * as React from 'react';
import PanelBlokk from '../felles/panel-blokk';
import KnappNeste from '../skjema/knapp-neste';
import { RouteComponentProps } from 'react-router';

function RegVelykket({history}: RouteComponentProps<History>) {
    return (
        <div>
            <div>
                <PanelBlokk
                    tittelId="overskrift-regvelykket"
                    tittelCssType="info-sirkel-gronn"
                    beskrivelseId="beskrivelse-regvelykket"
                    knappAksjoner={
                        <KnappNeste
                            key="2"
                            onClick={(() => {
                                history.push('/skjema/1');
                            })}
                        />
                    }
                />
            </div>
        </div>
    );
}

export default RegVelykket;