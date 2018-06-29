import * as React from 'react';
import { connect } from 'react-redux';
import { State as SvarState } from '../../ducks/svar';
import { AppState } from '../../reducer';
import { FormattedMessage } from 'react-intl';
import { getTekstIdForOppsummering } from './oppsummering-utils';

interface OwnProps {
    sporsmalId?: string;
    tekstId?: string;
    skjul?: boolean;
}

interface StateProps {
    svarState: SvarState;
}

type Props = OwnProps & StateProps;

class OppsummeringElement extends React.Component<Props> {
    render() {
        if (this.props.skjul) {
            return null;
        }

        const sporsmalId = this.props.sporsmalId;
        const tekstId = (!sporsmalId || this.props.tekstId)
            ? this.props.tekstId!
            : getTekstIdForOppsummering(sporsmalId, this.props.svarState[sporsmalId]);

        return (
            <li className="typo-normal">
                {this.props.children}
                <FormattedMessage id={tekstId}/>
            </li>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    svarState: state.svar
});

export default connect(mapStateToProps)(OppsummeringElement);