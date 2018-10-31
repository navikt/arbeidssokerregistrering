import * as React from 'react';
import * as classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import AvbrytModal from '../avbryt-modal/avbryt-modal';

interface LenkeAvbrytProps {
    classname?: string;
    wrapperClassname?: string;
    tekstId: string;
}

interface LenkeAvbrytState {
    visAvbrytModal: boolean;
}

class LenkeAvbryt extends React.Component<LenkeAvbrytProps, LenkeAvbrytState> {

    constructor(props: LenkeAvbrytProps) {
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
        const { tekstId, wrapperClassname } = this.props;

        return (
            <>
                <div className={classnames('lenke-avbryt-wrapper', wrapperClassname)}>
                    <a className="lenke lenke-avbryt typo-element" onClick={this.handleAvbrytClick}>
                        <FormattedMessage id={tekstId}/>
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

export default LenkeAvbryt;
