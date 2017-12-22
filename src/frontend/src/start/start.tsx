import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import PanelBlokk from '../felles/panel-blokk';
import KnappNeste from '../skjema/knapp-neste';

type Props = RouteComponentProps<MatchProps>;

function Start({history}: Props) {
    return (
        <PanelBlokk
            tittelId="overskrift-start"
            tittelCssNavnVariant="bla-variant"
            beskrivelseId="beskrivelse-start"
            knappAksjoner={
                [
                    <Knapp key="1" type="standard" className="knapp">
                        <Normaltekst>
                            <FormattedMessage id="knapp-avbryt"/>
                        </Normaltekst>
                    </Knapp>,
                    <KnappNeste
                        key="2"
                        className="mml"
                        onClick={(() => {
                            history.push('/skjema/1');
                        })}
                    />
                ]
            }
        />
    );
}

export default Start;