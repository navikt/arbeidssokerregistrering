import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import { DITTNAV_URL, registrerBrukerSBLArbeid, SBLARBEID_URL } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Loader from '../../komponenter/loader/loader';

interface State {
    status: string;
}

class SblRegistrering extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {status: STATUS.OK};
        this.opprettMinIdISblOgSendBrukerTilSbl = this.opprettMinIdISblOgSendBrukerTilSbl.bind(this);
    }

    componentDidMount() {
        if (window.innerWidth > 768) {
            this.opprettMinIdISblOgSendBrukerTilSbl();
        }
    }

    sendBrukerTilSbl() {
        document.location.href = SBLARBEID_URL;
    }

    opprettMinIdISblOgSendBrukerTilSbl() {
        this.setState({status: STATUS.PENDING},
                      () => registrerBrukerSBLArbeid()
                        .then(this.sendBrukerTilSbl, this.sendBrukerTilSbl));
    }

    render() {

        // For å være sikker på at bruker ikke ser noe innhold før spinner rendres
        if (window.innerWidth > 768 && this.state.status === STATUS.OK) {
            return null;
        }

        return (
            <Innholdslaster avhengigheter={[this.state]} storrelse="XXL" loaderKomponent={<Loader/>}>
                <PanelBlokkGruppe
                    knappAksjoner={
                        [
                            <Knapp key="1" type="standard" onClick={() => document.location.href = DITTNAV_URL}>
                                <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                            </Knapp>,
                            <Knapp
                                key="2"
                                type="hoved"
                                className="mml"
                                onClick={this.opprettMinIdISblOgSendBrukerTilSbl}
                            >
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
            </Innholdslaster>
        );
    }
}

export default SblRegistrering;