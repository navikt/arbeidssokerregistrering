import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import NavFrontendModal from 'nav-frontend-modal';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import {
    hentAuthExpiration,
} from '../../ducks/auth-expiration';
import './timoutbox-modal.less';
import * as moment from 'moment';
import StartPaaNytt from './start-paa-nytt';
import { frontendLogger } from '../../metrikker/metrics-utils';
import { Data as AuthExpiration } from '../../ducks/auth-expiration';

const infoSvg = require('./info.svg');

interface EgenState {
    skalVise: boolean;
}

interface DispatchProps {
    hentAuthExpiration: () => Promise<void | {}>;
}

class TimoutboxModal extends React.Component<DispatchProps, EgenState> {

    private timeout;

    constructor(props: DispatchProps) {
        super(props);
        this.state = {
            skalVise: false,
        };
    }

    componentDidMount() {
        this.props.hentAuthExpiration()
            .then((authExp: AuthExpiration) => {
                const { expirationTime } = authExp;

                if (!this.timeout && expirationTime) {

                    const expirationInMillis = moment(expirationTime).subtract(1, 'minutes').diff(
                        moment(),
                        'ms'
                    );

                    this.timeout = setTimeout(() => {
                        frontendLogger('timeoutbox.sesjon.utgatt');
                        this.setState({
                            skalVise: true
                        });
                    }, expirationInMillis + 100);
                }
            });
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const skalVise = this.state.skalVise;

        return (
            <NavFrontendModal
                isOpen={skalVise}
                contentLabel="Blir logget ut"
                className="timeoutbox-modal"
                shouldCloseOnOverlayClick={false}
                closeButton={false}
                onRequestClose={() => false}
            >
                <Veilederpanel
                    type="plakat"
                    kompakt={true}
                    svg={<img
                        src={infoSvg}
                        className="timeoutbox-modal__illustrasjon"
                    />}
                >
                    <div className="timeoutbox-nedtelling">
                        <StartPaaNytt/>
                    </div>
                </Veilederpanel>
            </NavFrontendModal>
        );
    }

}

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentAuthExpiration: () => dispatch(hentAuthExpiration()),
});

export default connect(null, mapDispatchToProps)(TimoutboxModal);
