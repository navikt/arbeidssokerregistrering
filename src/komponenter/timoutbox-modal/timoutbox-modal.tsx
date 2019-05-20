import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import NavFrontendModal from 'nav-frontend-modal';
import './timoutbox-modal.less';
import StartPaaNytt from './start-paa-nytt';
import { frontendLogger } from '../../metrikker/metrics-utils';
import * as Api from '../../ducks/api';
import * as moment from 'moment';

const infoSvg = require('./info.svg');

interface AuthExpiration {
    remainingSeconds: string;
    expirationTime: string;
}

interface EgenState {
    skalVise: boolean;
}

class TimoutboxModal extends React.Component<{}, EgenState> {

    private timeout;

    constructor(props: any) { // tslint:disable-line
        super(props);
        this.state = {
            skalVise: false,
        };
    }

    componentDidMount() {
        Api.hentAuthExpiration()
            .then((authExp: AuthExpiration) => {
                const { expirationTime } = authExp;

                if (!this.timeout && expirationTime) {

                    const expirationInMillis = this.utloptTispunktMinusFemMinutter(expirationTime);

                    // SetTimeout til å vise informasjon melding når sesjon er utløpt
                    this.timeout = setTimeout(() => {
                        frontendLogger('timeoutbox.sesjon.utgatt');
                        this.setState({
                            skalVise: true
                        });
                    }, expirationInMillis + 100);

                    // I tilfelle pc/nettleseren går i Dvale modus:
                    // Når pc/nettleseren går i dvale modus så lenge at sesjonen utløper, så vil SetTimeout ikke
                    // fungere. Bruker derfor mousedown event + sjekk om sesjonen er utløpt, og sørger for at meldingen
                    // vises med en gang bruker prøver å gjøre noe.
                    document.addEventListener('mousedown', () => {
                        const nyExpirationInMillis = this.utloptTispunktMinusFemMinutter(expirationTime);
                        this.setState({
                            skalVise: nyExpirationInMillis < 0,
                        });
                    });
                }
            });
    }

    utloptTispunktMinusFemMinutter(expirationTime: string) {
        return moment(expirationTime).subtract(5, 'minutes').diff(
            moment(),
            'ms'
        );
    }

    render() {
        const skalVise = this.state.skalVise;

        if (skalVise) {
            clearTimeout(this.timeout);
        }

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

export default TimoutboxModal;
