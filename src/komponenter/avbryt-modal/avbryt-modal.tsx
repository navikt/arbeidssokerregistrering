import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal';

import './avbryt-modal.less';
import { Knapp } from 'nav-frontend-knapper';
import { DITTNAV_URL } from '../../ducks/api';
import { RouteComponentProps, withRouter } from 'react-router';
import { MatchProps } from '../../utils/utils';

const avbrytSvg = require('./avbryt.svg');

interface OwnProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

type AllProps = RouteComponentProps<MatchProps> & OwnProps;

class AvbrytModal extends React.Component<AllProps> {

    handleAvbrytKnappClicked = () => {
        this.props.history.push(DITTNAV_URL);
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
                        <FormattedMessage id="avbryt-beskrivelse"/>
                    </Systemtittel>

                    <div className="avbryt-modal__actions">
                        <Knapp className="avbryt-modal__knapp" onClick={this.handleAvbrytKnappClicked}>
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

export default withRouter(AvbrytModal);