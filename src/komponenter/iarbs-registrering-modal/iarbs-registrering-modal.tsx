import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendModal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { IARBS_REGISTRERING_URL } from '../../utils/konstanter';
import { uniLogger } from '../../metrikker/uni-logger';

import './iarbs-registrering-modal.less';

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

    handleRegistreringKnappClicked = () => {
        uniLogger('registrering.iarbs.registrering.modal.registrer');
        window.location.href = IARBS_REGISTRERING_URL;
    }

    handleRegistreringAvbrytKnappClicked = () => {
        uniLogger('registrering.iarbs.registrering.modal.avbrutt');
        this.props.onRequestClose()
    }

    render() {
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
                        Du ønsker å registrere deg som arbeidssøker
                    </Systemtittel>

                    <Normaltekst>
                        Når du registrerer deg som arbeidssøker mister du retten til
                        <li>bala bla bla</li>
                        <li>bli bli bluff</li>
                        <p>
                            Ved å gå videre sier du at "everything is awesome!"
                        </p>
                    </Normaltekst>
                    <div className="avbryt-modal__actions">
                        <Knapp className="avbryt-modal__knapp" onClick={this.handleRegistreringKnappClicked}>
                            Ja, jeg vil registrere meg
                        </Knapp>
                        <Knapp className="avbryt-modal__knapp" onClick={this.handleRegistreringAvbrytKnappClicked}>
                            Nei, avbryt
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
