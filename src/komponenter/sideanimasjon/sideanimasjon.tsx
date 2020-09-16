import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MatchProps, scrollToBanner } from '../../utils/utils';
import { START_PATH } from '../../utils/konstanter';

type Props = RouteComponentProps<MatchProps>;

class Sideanimasjon extends React.Component<Props> {

    componentDidUpdate(prevProps: Readonly<Props>) {
        const newLocation = this.props.location;
        const currentLocation = prevProps.location;
        if (currentLocation !== newLocation) {
            scrollToBanner();
        }
    }

    render() {
        const forover: boolean = (this.props.history.action === 'PUSH');
        return (
            <div
                className={(this.props.location.pathname !== START_PATH ? 'limit ' : '')
                + (forover ? 'forover' : 'bakover')}
            >
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Sideanimasjon);
