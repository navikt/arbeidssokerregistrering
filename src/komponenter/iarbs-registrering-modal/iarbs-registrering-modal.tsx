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
                    <Systemtittel className="avbryt-modal__beskrivelse blokk-m">
                        Du vil søke eller har søkt dagpenger og ønsker derfor å registrere deg som arbeidssøker
                    </Systemtittel>

                    <Normaltekst className="blokk-m">
                        Å registrere deg som arbeidssøker betyr at du ikke lenger vil være registrert som sykmeldt hos NAV.<br/>
                        Hvis du mottar eller har rett til sykepenger risikerer du å miste retten til disse da du ikke kan motta to ytelser samtidig.
                        <p>
                            Jeg bekrefter at jeg vil registrere med som arbeidssøker
                        </p>
                    </Normaltekst>
                    <div className="avbryt-modal">
                        <Knapp className="avbryt-modal__knapp blokk-s" onClick={this.handleRegistreringKnappClicked}>
                            Ja, jeg vil registrere meg som arbeidssøker
                        </Knapp>
                        <Knapp className="avbryt-modal__knapp" onClick={this.handleRegistreringAvbrytKnappClicked}>
                            Avbryt
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
