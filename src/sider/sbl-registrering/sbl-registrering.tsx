import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import { DITTNAV_URL, registrerBrukerSBLArbeid } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import { sendBrukerTilSblArbeid } from '../oppsummering/oppsummering-utils';
import Loader from '../../komponenter/loader/loader';

interface State {
    status: string;
}

interface SblRegistreringConfig {
    sendBrukerTilSblArbeid: () => void;
}

interface Props {
    config?: SblRegistreringConfig;
}

class SblRegistrering extends React.Component<Props, State> {
    static defaultProps: Partial<Props> = {
        config: {
            sendBrukerTilSblArbeid: sendBrukerTilSblArbeid,
        }
    };

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

    opprettMinIdISblOgSendBrukerTilSbl() {
        const { config } = this.props;
        this.setState({status: STATUS.PENDING},
                      () => registrerBrukerSBLArbeid()
                        .then(config!.sendBrukerTilSblArbeid, config!.sendBrukerTilSblArbeid));
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
                            <KnappBase
                                key="1"
                                type="standard"
                                onClick={() => document.location.href = DITTNAV_URL}
                                className="sbl-registrering__knapp"
                            >
                                <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                            </KnappBase>,
                            <KnappBase
                                key="2"
                                type="hoved"
                                className="sbl-registrering__knapp"
                                onClick={this.opprettMinIdISblOgSendBrukerTilSbl}
                            >
                                <FormattedMessage id="knapp-sbl-registrering-neste"/>
                            </KnappBase>
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