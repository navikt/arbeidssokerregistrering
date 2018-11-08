import * as React from 'react';
import * as classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import AvbrytModal from '../avbryt-modal/avbryt-modal';
import { AppState } from '../../reducer';
import { RegistreringType, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { connect } from 'react-redux';

import './lenke-avbryt.less';

interface LenkeAvbrytProps {
    classname?: string;
    wrapperClassname?: string;
    tekstId?: string;
}

interface LenkeAvbrytState {
    visAvbrytModal: boolean;
}

interface StateProps {
    registreringType?: RegistreringType;
}

type AllProps = StateProps & LenkeAvbrytProps;

class LenkeAvbryt extends React.Component<AllProps, LenkeAvbrytState> {

    constructor(props: AllProps) {
        super(props);

        this.state = {
            visAvbrytModal: false
        };
    }

    handleAvbrytClick = (): void => {
        this.setState({ visAvbrytModal: true });
    }

    handleAvbrytModalRequestClose = (): void => {
        this.setState({ visAvbrytModal: false });
    }

    render() {
        const { tekstId, wrapperClassname, registreringType } = this.props;
        let id;

        if (tekstId) {
            id = tekstId;
        } else {
            id = (registreringType === RegistreringType.SYKMELDT_REGISTRERING)
                ? 'avbryt-lenke-sykmeldt' : 'avbryt-lenke-registrering';
        }

        return (
            <>
                <div className={classnames('lenke-avbryt-wrapper', wrapperClassname)}>
                    <a className="lenke lenke-avbryt typo-element" onClick={this.handleAvbrytClick}>
                        <FormattedMessage id={id}/>
                    </a>
                </div>
                <AvbrytModal
                    isOpen={this.state.visAvbrytModal}
                    onRequestClose={this.handleAvbrytModalRequestClose}
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    registreringType: selectRegistreringstatus(state).data.registreringType
});

export default connect(mapStateToProps)(LenkeAvbryt);
