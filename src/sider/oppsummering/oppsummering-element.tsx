import * as React from "react";
import { connect } from 'react-redux';
import { State as SvarState } from '../../ducks/svar';
import {AppState} from "../../reducer";
import { FormattedMessage } from 'react-intl';
import {getTekstIdForOppsummering} from "./oppsummering-utils";

interface OwnProps {
    sporsmalId: string
}

interface StateProps {
    svarState: SvarState;
}

type Props = OwnProps & StateProps;

class OppsummeringElement extends React.Component<Props> {
    render() {
        const sporsmalId = this.props.sporsmalId;
        const tekstId = getTekstIdForOppsummering(sporsmalId, this.props.svarState[sporsmalId]);
        return (
            <li className="typo-normal">
                <FormattedMessage id={tekstId}/>
            </li>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    svarState: state.svar
});

export default connect(mapStateToProps)(OppsummeringElement);