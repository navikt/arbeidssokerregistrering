import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import { DITT_NAV_URL, registrerBrukerSBLArbeid } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Loader from '../../komponenter/loader/loader';
import { sendBrukerTilSblArbeid } from '../oppsummering/oppsummering-utils';

interface State {
    status: string;
}

interface SblRegistreringConfig {
    redirect: () => void;
}

interface Props {
    config?: SblRegistreringConfig;
}

export function sendBrukerTilDittNav() {
    document.location.href = DITT_NAV_URL;
}

class SblRegistrering extends React.Component<Props, State> {
    static defaultProps: Partial<Props> = {
        config: {
            redirect: sendBrukerTilSblArbeid
        },
    };

    constructor(props: {}) {
        super(props);
        this.state = {status: STATUS.OK};
        this.executeRedirect = this.executeRedirect.bind(this);
    }

    componentDidMount() {
        if (window.innerWidth > 768) {
            this.executeRedirect();
        }
    }

    executeRedirect() {
        const { config } = this.props;
        this.setState({status: STATUS.PENDING},
                      () => registrerBrukerSBLArbeid()
                        .then(config!.redirect, config!.redirect));
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
                                onClick={() => document.location.href = DITT_NAV_URL}
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