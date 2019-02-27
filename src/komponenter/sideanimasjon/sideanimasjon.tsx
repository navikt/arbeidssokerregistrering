import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MatchProps, scrollToBanner } from '../../utils/utils';
import { START_PATH } from '../../utils/konstanter';

interface State {
    forover: boolean;
}

type Props = RouteComponentProps<MatchProps>;

class Sideanimasjon extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            forover: true
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const currentLocation = this.props.location;
        const nextLocation = nextProps.location;
        if (nextLocation !== currentLocation) {
            scrollToBanner();
            this.setState({
                ...this.state,
                forover: nextProps.history.action !== 'POP'
                // skalAnimereForover(currentLocation.pathname, nextLocation.pathname),
            });
        }
    }

    render() {
        return (
            <div
                className={(this.props.location.pathname !== START_PATH ? 'limit ' : '')
                + (this.state.forover ? 'forover' : 'bakover')}
            >
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Sideanimasjon);
