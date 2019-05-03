import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import {
    hentAuthExpiration,
    selectAuthExpiration
} from '../../ducks/auth-expiration';
import './timoutbox-modal.less';
// import * as moment from 'moment';

const avbrytSvg = require('./avbryt.svg');

interface EgenState {
    manueltLukket: boolean;
}

interface DispatchProps {
    hihentAuthExpiration: () => void;
}

interface StateProps {
    remainingSeconds?: number;
}

type AllProps = StateProps & DispatchProps;

class TimoutboxModal extends React.Component<AllProps, EgenState> {

    constructor(props: AllProps) {
        super(props);
        this.state = {
            manueltLukket: false,
        };
        this.props.hihentAuthExpiration();
    }

    componentDidUpdate() {
        console.log('this.props.remainingSeconds', this.props.remainingSeconds); // tslint:disable-line
    }

    // visningsTidspunkt() {
    //     return moment(this.props.expirationTime).subtract(5, 'minutes');
    // }
    //
    // skalViseModal() {
    //     return (
    //         moment().isAfter(this.visningsTidspunkt())
    //     );
    // }

    render() {
        const skalVise = true; // this.skalViseModal();
        const utlopsTidspunkt = null; // this.props.expirationTime;
        if (!utlopsTidspunkt) {
            return null;
        }

        return (
            <NavFrontendModal
                isOpen={skalVise}
                contentLabel="Blir logget ut"
                shouldCloseOnOverlayClick={false}
                className="timeoutbox-modal"
                onRequestClose={() => {
                    this.setState({
                        manueltLukket: true,
                    });
                }}

            >
                <Veilederpanel
                    type="plakat"
                    kompakt={true}
                    svg={<img
                        src={avbrytSvg}
                        alt="Informasjon"
                        className="timeoutbox-modal__illustrasjon"
                    />}
                >
                    <Systemtittel className="timeoutbox-modal__beskrivelse">
                        <FormattedMessage id="test"/>
                    </Systemtittel>

                    <div className="timeoutbox-modal__actions">
                        <Knapp
                            className="timeoutbox-modal__knapp"
                            onClick={
                                () => null
                            }
                        >
                            <FormattedMessage id="knapp-ja-avbryt"/>
                        </Knapp>
                        <Knapp className="timeoutbox-modal__knapp" onClick={() => null}>
                            <FormattedMessage id="knapp-nei"/>
                        </Knapp>
                    </div>
                </Veilederpanel>
            </NavFrontendModal>
        );
    }

}

const mapStateToProps = (state: AppState): StateProps => ({
    remainingSeconds: selectAuthExpiration(state).data.remainingSeconds
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hihentAuthExpiration: () => dispatch(hentAuthExpiration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimoutboxModal);
