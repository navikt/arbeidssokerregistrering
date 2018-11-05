import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal';

import './avbryt-modal.less';
import { Knapp } from 'nav-frontend-knapper';
import { DITTNAV_URL } from '../../ducks/api';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';

const avbrytSvg = require('./avbryt.svg');

interface OwnProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface StateProps {
    registreringType?: RegistreringType;
}

type AllProps = StateProps & OwnProps;

class AvbrytModal extends React.Component<AllProps> {

    render() {

        const { registreringType } = this.props;

        const beskrivelseId = (registreringType === RegistreringType.SYKMELDT_REGISTRERING)
            ? 'avbryt-beskrivelse-sykmeldt' : 'avbryt-beskrivelse-registrering';

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
                        <FormattedMessage id={beskrivelseId}/>
                    </Systemtittel>

                    <div className="avbryt-modal__actions">
                        <Knapp className="avbryt-modal__knapp" onClick={() => document.location.href = DITTNAV_URL}>
                            <FormattedMessage id="knapp-ja-avbryt"/>
                        </Knapp>
                        <Knapp className="avbryt-modal__knapp" onClick={this.props.onRequestClose}>
                            <FormattedMessage id="knapp-nei"/>
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