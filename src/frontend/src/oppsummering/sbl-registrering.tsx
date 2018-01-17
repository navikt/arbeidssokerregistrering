import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import { connect } from 'react-redux';
import { dittnavSelector, sblarbeidUrlSelector } from '../ducks/api';

interface Props {
    sblarbeid_url: string;
    dittnav_url: string;
}

function SblRegistrering({ sblarbeid_url, dittnav_url }: Props) {
    if (window.innerWidth > 768) {
        document.location.href = sblarbeid_url;
        return null;
    }
    return (
        <PanelBlokkGruppe
            knappAksjoner={
                [
                    <Knapp key="1" type="standard" onClick={() => document.location.href = dittnav_url}>
                        <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                    </Knapp>,
                    <Knapp key="2" type="hoved" className="mml" onClick={() => document.location.href = sblarbeid_url}>
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

const mapStateToProps = (state) => ({
    sblarbeid_url: sblarbeidUrlSelector(state),
    dittnav_url: dittnavSelector(state)
});

export default connect(mapStateToProps)(SblRegistrering);