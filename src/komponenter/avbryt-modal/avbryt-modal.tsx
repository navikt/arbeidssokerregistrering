import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel } from 'nav-frontend-typografi';
import NavFrontendModal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { DITT_NAV_URL, DITT_SYKEFRAVAER_URL } from '../../utils/konstanter';
import { frontendLogger } from '../../metrikker/metrics-utils';
import './avbryt-modal.less';
import { erIFSS } from '../../utils/fss-utils';
import { lagAktivitetsplanUrl } from '../../utils/url-utils';
import { getTekst } from '../../utils/utils';
const avbrytSvg = require('./avbryt.svg');

interface OwnProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface StateProps {
    registreringType?: RegistreringType;
}

type AllProps = OwnProps & StateProps;

class AvbrytModal extends React.Component<AllProps> {

    handleAvbrytKnappClicked = (url: string) => {
        frontendLogger('registrering.avbryt.modal.avbrutt', { fromUrl: window.location.href }, {});
        window.location.href = url;
    }

    render() {

        const { registreringType } = this.props;
        let beskrivelseId;
        let url: string;

        if (registreringType === RegistreringType.SYKMELDT_REGISTRERING) {
            beskrivelseId = 'avbryt-beskrivelse-sykmeldt';
            url = erIFSS() ? lagAktivitetsplanUrl() : DITT_SYKEFRAVAER_URL;
        } else {
            beskrivelseId = 'avbryt-beskrivelse-registrering';
            url = erIFSS() ? lagAktivitetsplanUrl() : DITT_NAV_URL;
        }

        return (
            <NavFrontendModal
                isOpen={this.props.isOpen}
                contentLabel="Avbryt registrering"
                onRequestClose={this.props.onRequestClose}
                closeButton={false}
                className="avbryt-modal"
            >
                <Veilederpanel
                    type="plakat"
                    kompakt={true}
                    svg={<img
                        src={avbrytSvg}
                        alt="Informasjon"
                        className="avbryt-modal__illustrasjon"
                    />}
                >
                    <Systemtittel className="avbryt-modal__beskrivelse">
                        { getTekst(beskrivelseId, 'nb') }
                    </Systemtittel>

                    <div className="avbryt-modal__actions">
                        <Knapp className="avbryt-modal__knapp" onClick={() => this.handleAvbrytKnappClicked(url)}>
                            { getTekst('knapp-ja-avbryt', 'nb') }
                        </Knapp>
                        <Knapp className="avbryt-modal__knapp" onClick={this.props.onRequestClose}>
                            { getTekst('knapp-nei', 'nb') }
                        </Knapp>
                    </div>
                </Veilederpanel>
            </NavFrontendModal>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    registreringType: selectRegistreringstatus(state).data.registreringType
});

export default connect(mapStateToProps)(AvbrytModal);
