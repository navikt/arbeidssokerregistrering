import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';

type Props = RouteComponentProps<MatchProps>;

function RegistrerDeg({history}: Props) {
    return (
        <PanelBlokkGruppe
            knappAksjoner={
                <Knapp type="hoved" className="knapp knapp--hoved" onClick={() => history.push('/start')}>
                    <FormattedMessage id="knapp-registrerdeg"/>
                </Knapp>}
        >
            <PanelBlokk
                tittelId="overskrift-registrerdeg"
                tittelCssNavnVariant="bla-variant"
            >
                <Normaltekst>
                    <FormattedMessage id={'beskrivelse-registrerdeg'}/>
                </Normaltekst>
                <ul className="typo-normal blokk-xs pml mmt">
                    <li><FormattedMessage id="liste-dufarhjelp"/></li>
                    <li><FormattedMessage id="liste-dukansoke"/></li>
                    <li><FormattedMessage id="liste-arbeidsgiverefinner"/></li>
                    <li><FormattedMessage id="liste-dukanabonnere"/></li>
                </ul>
                <Normaltekst className="bla-italic">
                    <FormattedMessage id="tips-fullforregistrering"/>
                </Normaltekst>
            </PanelBlokk>
        </PanelBlokkGruppe>

    );
}

export default RegistrerDeg;