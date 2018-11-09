import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import { DITT_NAV_URL, registrerBrukerSBLArbeid, SBLARBEID_URL } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Loader from '../../komponenter/loader/loader';

import './sbl-registrering.less';

interface State {
    status: string;
}

interface SblRegistreringConfig {
    redirect: () => void;
}

interface SblRegistreringProps {
    config?: SblRegistreringConfig;
}

export function sendBrukerTilDittNav() {
    window.location.href = DITT_NAV_URL;
}

export function sendBrukerTilSblArbeid() {
    window.location.href = SBLARBEID_URL;
}

class SblRegistrering extends React.Component<SblRegistreringProps, State> {

    static defaultProps: Partial<SblRegistreringProps> = {
        config: {
            redirect: sendBrukerTilSblArbeid
        },
    };

    constructor(props: SblRegistreringProps) {
        super(props);
        this.state = {status: STATUS.OK};
    }

    executeRedirect = () => {
        const { config } = this.props;

        this.setState({
                status: STATUS.PENDING},
            () => registrerBrukerSBLArbeid()
                .then(() => config!.redirect())
                .catch(() => config!.redirect())
        );

    }

    componentDidMount() {
        if (window.innerWidth > 768) {
            this.executeRedirect();
        }
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
                                onClick={sendBrukerTilDittNav}
                                className="sbl-registrering__knapp"
                            >
                                <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                            </KnappBase>,
                            <KnappBase
                                key="2"
                                type="hoved"
                                className="sbl-registrering__knapp"
                                onClick={this.executeRedirect}
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
