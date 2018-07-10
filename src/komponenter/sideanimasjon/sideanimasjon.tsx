import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MatchProps, scrollToBanner } from '../../utils/utils';
import { skalAnimereForover } from './sideanimasjon-utils';

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
        if (nextProps.location !== currentLocation) {
            scrollToBanner();
            this.setState({
                ...this.state,
                forover: skalAnimereForover(currentLocation.pathname, nextProps.location.pathname),
            });
        }
    }

    render() {
        return (
            <div className={'limit ' + (this.state.forover ? 'forover' : 'bakover')}>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Sideanimasjon);
