import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import { DITTNAV_URL, registrerBrukerSBLArbeid, SBLARBEID_URL } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Loader from '../../komponenter/loader/loader';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';
import { MatchProps } from '../../utils/utils';

interface State {
    status: string;
}

interface SblRegistreringConfig {
    redirect: (history: History) => void;
}

interface SblRegistreringProps {
    config?: SblRegistreringConfig;
}

type AllProps = SblRegistreringProps & RouteComponentProps<MatchProps>;

export function sendBrukerTilDittNav(history: History) {
    history.push(DITTNAV_URL);
}

export function sendBrukerTilSblArbeid(history: History) {
    history.push(SBLARBEID_URL);
}

class SblRegistrering extends React.Component<AllProps, State> {

    static defaultProps: Partial<AllProps> = {
        config: {
            redirect: sendBrukerTilSblArbeid
        },
    };

    constructor(props: AllProps) {
        super(props);
        this.state = {status: STATUS.OK};
    }

    executeRedirect = () => {
        const { config, history } = this.props;

        this.setState({
                status: STATUS.PENDING},
            () => registrerBrukerSBLArbeid()
                .then(() => config!.redirect(history))
                .catch(() => config!.redirect(history))
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
                                onClick={() => sendBrukerTilDittNav(this.props.history)}
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

export default withRouter(SblRegistrering);